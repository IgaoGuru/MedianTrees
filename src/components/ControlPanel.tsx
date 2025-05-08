interface ControlPanelProps {
  onNewProject: () => void;
  onNewTask: () => void;
}

const ControlPanel = ({ onNewProject, onNewTask }: ControlPanelProps) => {
  return (
    <div className="control-panel">
      <button onClick={onNewProject} className="control-button">
        New Project
      </button>
      <button onClick={onNewTask} className="control-button">
        New Task
      </button>
    </div>
  );
};

export default ControlPanel; 