import { useCallback, useMemo, useEffect, useState } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    type ColorMode,
    addEdge,
    type OnConnect,
    type Node,
    type Edge,
} from '@xyflow/react';
import ProjectModal from './ProjectModal';
import ProjectNode from './ProjectNode';
import ControlPanel from './ControlPanel';
import { saveProject, getLatestProject } from '../utils/storage';

interface ProjectNodeData {
  title: string;
  description: string;
  [key: string]: unknown;
}

type ProjectNode = Node<ProjectNodeData>;

const TaskBoard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<ProjectNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [currentProjectName, setCurrentProjectName] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const nodeTypes = useMemo(() => ({
    project: ProjectNode,
  }), []);

  // Load the latest project on mount
  useEffect(() => {
    const latestProject = getLatestProject();
    if (latestProject) {
      setNodes(latestProject.data.nodes as ProjectNode[]);
      setEdges(latestProject.data.edges);
      setCurrentProjectName(latestProject.name);
    }
  }, []);

  // Save project whenever nodes or edges change
  useEffect(() => {
    if (currentProjectName && nodes.length > 0) {
      saveProject(currentProjectName, nodes, edges);
    }
  }, [nodes, edges, currentProjectName]);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleProjectCreate = (title: string, description: string) => {
    const newNode: ProjectNode = {
      id: '1',
      type: 'project',
      position: { x: 0, y: 0 },
      data: { title, description },
    };
    setNodes([newNode]);
    setEdges([]);
    setCurrentProjectName(title);
    setShowProjectModal(false);
  };

  const handleNewProject = () => {
    setNodes([]);
    setEdges([]);
    setCurrentProjectName(null);
    setShowProjectModal(true);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ControlPanel onNewProject={handleNewProject} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode="light"
        fitView
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
      {showProjectModal && <ProjectModal onSubmit={handleProjectCreate} onCancel={() => setShowProjectModal(false)} />}
    </div>
  );
};

export default TaskBoard; 