import { Handle, Position } from '@xyflow/react';

interface ProjectNodeData {
  title: string;
  description: string;
}

interface ProjectNodeProps {
  data: ProjectNodeData;
}

const ProjectNode = ({ data }: ProjectNodeProps) => {
  return (
    <div className="project-node">
      <div className="project-node-content">
        <h3 className="project-title">{data.title}</h3>
        {data.description && (
          <p className="project-description">{data.description}</p>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ProjectNode; 