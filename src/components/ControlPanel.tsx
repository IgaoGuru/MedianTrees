interface ControlPanelProps {
  onNewProject: () => void;
  onNewTask: () => void;
  onLayout: () => void;
}

const ControlPanel = ({ onNewProject, onNewTask, onLayout }: ControlPanelProps) => {
  return (
    <div className="control-panel">
      <button onClick={onNewProject} className="control-button">
        New Project
      </button>
      <button onClick={onNewTask} className="control-button">
        New Task
      </button>
      <button onClick={onLayout} className="control-button">
        Layout Tree
      </button>
    </div>
  );
};

export default ControlPanel; 