import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';

type ProjectNodeData = Node<{
  title: string;
  description: string;
  hours: number;
  hasChildren: boolean;
}, 'project'>

const ProjectNode = ({ data }: NodeProps<ProjectNodeData>) => {
  return (
    <div className="project-node">
      <div className="project-node-content">
        <h3 className="project-title">{data.title}</h3>
        {data.description && (
          <p className="project-description">{data.description}</p>
        )}
        <p>
          {data.hours}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ProjectNode; 