interface ControlPanelProps {
  onNewProject: () => void;
}

const ControlPanel = ({ onNewProject }: ControlPanelProps) => {
  return (
    <div className="control-panel">
      <button onClick={onNewProject} className="new-project-button">
        New Project
      </button>
    </div>
  );
};

export default ControlPanel; 