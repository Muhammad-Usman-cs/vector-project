import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      <aside className="w-[210px] shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col overflow-y-auto">
        <div className="px-4 pt-[18px] pb-[14px] border-b border-slate-700 flex flex-col gap-0.5">
          <span className="text-base font-bold text-violet-400 tracking-tight">VectorShift</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.1em] font-medium">Pipeline Builder</span>
        </div>
        <PipelineToolbar />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex-1 overflow-hidden">
          <PipelineUI />
        </div>
        <div className="bg-slate-800 border-t border-slate-700 px-5 py-[10px] flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-600">
            Drag nodes onto the canvas, connect them, then click Submit.
          </span>
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
