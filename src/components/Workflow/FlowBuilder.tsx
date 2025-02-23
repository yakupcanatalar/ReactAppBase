import React, { useState, useCallback } from "react";
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

const CustomNode = ({ data }: { data: { label: string; status: string } }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        borderRadius: "50%",
        padding: "20px",
        textAlign: "center",
        border: "1px solid black",
        width: "100px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data.label}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const FlowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [savedFlows, setSavedFlows] = useState<{ name: string; nodes: Node[]; edges: Edge[] }[]>([]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const taskName = event.dataTransfer.getData("task");
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "custom",
      position: { x: event.clientX - 100, y: event.clientY - 100 },
      data: { label: taskName, status: "pending" },
      draggable: true,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveFlow = () => {
    const flowName = prompt("Lütfen akış için bir isim girin:");
    if (flowName) {
      setSavedFlows((flows) => [...flows, { name: flowName, nodes, edges }]);
      alert("✅ Akış kaydedildi!");
    }
  };

  const goToHomePage = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{ flex: 1, height: "100vh", borderLeft: "1px solid #ddd", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <button onClick={saveFlow} className="btn btn-secondary" style={{ position: "absolute", top: 10, right: 20, zIndex: 10 }}>
          Kaydet
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
      <div style={{ width: "200px", padding: "10px", borderLeft: "1px solid #ddd", overflowY: "auto", textAlign: "center" }}>
        <h4 style={{ borderBottom: "1px solid", paddingBottom: "5px"  }}>Kaydedilenler</h4>
        {savedFlows.map((flow, index) => (
          <ul key={index} style={{ marginBottom: "10px" }}>
            <li>{flow.name}</li>
          </ul>
        ))}
        <button onClick={goToHomePage} className="btn btn-secondary" style={{ position: "fixed", bottom: 10, right: 20 }}> Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default FlowBuilder;