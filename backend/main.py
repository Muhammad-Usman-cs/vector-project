from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, List
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineData(BaseModel):
    nodes: List[Any]
    edges: List[Any]


def check_is_dag(nodes: list, edges: list) -> bool:
    """Kahn's algorithm — returns True if the graph has no cycles."""
    node_ids = {n["id"] for n in nodes}
    graph: dict[str, list] = defaultdict(list)
    in_degree: dict[str, int] = {nid: 0 for nid in node_ids}
    
    for edge in edges:
        src, tgt = edge.get("source"), edge.get("target")
        if src in node_ids and tgt in node_ids:
            graph[src].append(tgt)
            in_degree[tgt] += 1

    queue = deque(nid for nid, deg in in_degree.items() if deg == 0)
    visited = 0
    while queue:
        nid = queue.popleft()
        visited += 1
        for neighbor in graph[nid]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    is_dag = check_is_dag(data.nodes, data.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
