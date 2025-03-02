import React, { useState, useEffect } from "react";
import { createTaskStage, getTaskStages } from "../../Services/Services"; // Import the createTaskStage and getTaskStages functions

const Sidebar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [tasks, setTasks] = useState<{ id: number; task: string; action: () => void }[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskStages = await getTaskStages();
        const formattedTasks = taskStages.map((taskStage: any) => ({
          id: taskStage.id,
          task: taskStage.name,
          action: () => console.log(`${taskStage.name} clicked`),
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching task stages:", error);
      }
    };

    fetchTasks();
  }, []);

  const onDragStart = (event: React.DragEvent, id: number, task: string) => {
    event.dataTransfer.setData("task", JSON.stringify({ id, task }));
  };

  const addTask = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await createTaskStage({ name: taskName, note: taskNote });
      setShowModal(false);
      setTaskName("");
      setTaskNote("");
      alert("Task stage created successfully!");
      // Refresh the task list
      const taskStages = await getTaskStages();
      const formattedTasks = taskStages.map((taskStage: any) => ({
        id: taskStage.id,
        task: taskStage.name,
        action: () => console.log(`${taskStage.name} clicked`),
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error creating task stage:", error);
      alert("Failed to create task stage.");
    }
  };

  return (
    <div style={{ width: "200px", padding: "10px", maxHeight: "100vh", overflowY: "auto", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid", paddingBottom: "5px" }}>
        <h4 style={{ margin: 0 }}>Task Listesi</h4>
      </div>
      {tasks.map(({ id, task, action }) => (
        <div
          key={id}
          draggable
          onDragStart={(event) => onDragStart(event, id, task)}
          onClick={action}
          style={{
            width: "150px",
            height: "50px",
            padding: "8px",
            margin: "5px auto",
            cursor: "grab",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          {task}
        </div>
      ))}
      <button onClick={addTask} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "30px", color: "white", marginTop: "10px" }}>+</button>

      {showModal && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}>
          <h3>Create Task Stage</h3>
          <input
            type="text"
            placeholder="Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <textarea
            placeholder="Note"
            value={taskNote}
            onChange={(e) => setTaskNote(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <button onClick={handleSave} style={{ marginRight: "10px" }}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
      {showModal && <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }} onClick={() => setShowModal(false)} />}
    </div>
  );
};

export default Sidebar;