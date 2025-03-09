import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
  NodeChange,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import { getTasks, createTask, getTaskById, deleteTaskById, updateTaskById } from "../../Services/TaskService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const CustomNode = ({ data, id }: { data: { label: string; status: string; removeNode: (id: string) => void }, id: string }) => {
  return (
    <div className="customNode"
    >
      {data.label}
      <button onClick={() => data.removeNode(id)} style={{ marginLeft: "10px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>X</button>
      <Handle type="source" position={Position.Bottom} style={{ background: "#000" }} />
      <Handle type="target" position={Position.Top} style={{ background: "#000" }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const FlowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [savedFlows, setSavedFlows] = useState<{ id: number; name: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFlowId, setCurrentFlowId] = useState<number | null>(null);
  const [currentFlowName, setCurrentFlowName] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        const formattedTasks = tasks.map((task: any) => ({
          id: task.id,
          name: task.name,
        }));
        setSavedFlows(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const taskData = JSON.parse(event.dataTransfer.getData("task"));
    const { id, task } = taskData;

    const newNode: Node = {
      id: id.toString(),
      type: "custom",
      position: { x: 100, y: nodes.length * 60 + 50 },
      data: { label: task, status: "pending", removeNode },
      draggable: true,
    };
    setNodes((nds) => [...nds, newNode]);

    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      const newEdge: Edge = {
        id: `e${lastNode.id}-${newNode.id}`,
        source: lastNode.id,
        target: newNode.id,
      };
      setEdges((eds) => [...eds, newEdge]);
    }
  };

  const removeNode = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const saveFlow = async () => {
    const flowName = prompt("Lütfen akış için bir isim girin:");
    if (flowName) {
      try {
        const stageIds = nodes.map(node => Number(node.id));
        await createTask({ name: flowName, note: flowName, stageIds });
        setSavedFlows((flows) => [...flows, { id: flows.length + 1, name: flowName }]);
        alert("✅ Akış kaydedildi!");
      } catch (error) {
        console.error("Error saving flow:", error);
      }
    }
  };

  const updateFlow = async () => {
    if (currentFlowId !== null) {
      try {
        const stageIds = nodes.map(node => Number(node.id));
        await updateTaskById(currentFlowId, { name: currentFlowName, note: currentFlowName, stageIds });
        setSavedFlows((flows) => flows.map(flow => flow.id === currentFlowId ? { id: flow.id, name: currentFlowName } : flow));
        alert("✅ Akış güncellendi!");
      } catch (error) {
        console.error("Error updating flow:", error);
      }
    }
  };

  const loadFlow = async (taskId: number) => {
    try {
      const task = await getTaskById(taskId);
      const deserializedNodes = task.stages.map((stage: any, index: number) => ({
        id: stage.id.toString(),
        type: "custom",
        position: { x: 100, y: index * 60 + 50 },
        data: { label: stage.name, status: "pending", removeNode },
        draggable: true,
      }));
      setNodes(deserializedNodes);

      const deserializedEdges = task.stages.slice(1).map((stage: any, index: number) => ({
        id: `e${task.stages[index].id}-${stage.id}`,
        source: task.stages[index].id.toString(),
        target: stage.id.toString(),
      }));
      setEdges(deserializedEdges);
      setIsEditing(true);
      setCurrentFlowId(taskId);
      setCurrentFlowName(task.name);
    } catch (error) {
      console.error("Error loading flow:", error);
    }
  };

  const deleteFlow = async (taskId: number) => {
    try {
      await deleteTaskById(taskId);
      setSavedFlows((flows) => flows.filter(flow => flow.id !== taskId));
      alert("✅ Akış silindi!");
    } catch (error) {
      console.error("Error deleting flow:", error);
    }
  };

  const goToHomePage = () => {
    window.location.href = "/Admin";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          height: "100vh",
          borderLeft: "1px solid #ddd",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <button onClick={isEditing ? updateFlow : saveFlow} className="btn btn-secondary" style={{ position: "absolute", top: 10, right: 20, zIndex: 10 }}>
          {isEditing ? "Güncelle" : "Kaydet"}
        </button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={{ width: "100%", height: "100%" }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div style={{ width: "200px", padding: "10px", maxHeight: "100vh", overflowY: "auto", textAlign: "center", backgroundColor: "#000", color: "#fff", borderLeft: "1px solid #ddd" }}>
      <h4 style={{ borderBottom: "1px solid", paddingBottom: "5px", textAlign: "center" }}>İş Akışları</h4>
        {savedFlows.map((flow) => (
          <div key={flow.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", color: "#000", padding: "5px", borderRadius: "5px" }}>
            <span style={{ cursor: "pointer", flex: 1 }} onClick={() => loadFlow(flow.id)}>{flow.name}</span>
            <FontAwesomeIcon icon={faEdit} onClick={() => loadFlow(flow.id)} style={{ cursor: "pointer", marginRight: "5px" }} />
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteFlow(flow.id)} style={{ cursor: "pointer" }} />
          </div>
        ))}
        <button onClick={goToHomePage} className="btn btn-secondary" style={{ position: "fixed", bottom: 10, right: 20 }}> Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default FlowBuilder;