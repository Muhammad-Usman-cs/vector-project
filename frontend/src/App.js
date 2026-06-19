import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-text">VectorShift</span>
          <span className="sidebar-logo-sub">Pipeline Builder</span>
        </div>
        <PipelineToolbar />
      </aside>
      <div className="main-content">
        <div className="canvas-container">
          <PipelineUI />
        </div>
        <div className="bottom-bar">
          <span className="bottom-bar__hint">
            Drag nodes onto the canvas, connect them, then click Submit.
          </span>
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
