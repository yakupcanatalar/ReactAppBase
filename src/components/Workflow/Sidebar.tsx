import React from "react";

const tasks = [
  { task: "Başla", action: () => console.log("Başla clicked") },
  { task: "Yıkama", action: () => console.log("Yıkama clicked") },
  { task: "Kurutma", action: () => console.log("Kurutma clicked") },
  { task: "Paketleme", action: () => console.log("Paketleme clicked") },
  { task: "Koşullu İşlem", action: () => console.log("Koşullu İşlem clicked") },
  { task: "SMS Gönder", action: () => console.log("SMS Gönder clicked") },
  { task: "Mail Gönder", action: () => console.log("Mail Gönder clicked") },
  { task: "Whatsapp", action: () => console.log("Whatsapp clicked") },
  { task: "Tamir", action: () => console.log("Tamir clicked") },
  { task: "Boya", action: () => console.log("Boya clicked") },
  { task: "Bitir", action: () => console.log("Bitir clicked") },

];

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, task: string) => {
    event.dataTransfer.setData("task", task);
  };

  return (
    <div style={{ width: "200px", padding: "10px", maxHeight: "100vh", overflowY: "auto", textAlign: "center" }}>
      <h4 style={{ borderBottom: "1px solid", paddingBottom: "5px" }}>Task Listesi</h4>
      {tasks.map(({ task, action }) => (
        <div
          key={task}
          draggable
          onDragStart={(event) => onDragStart(event, task)}
          onClick={action}
          style={{
            width: "75px",
            height: "75px",
            padding: "8px",
            margin: "5px auto",
            borderRadius: "50%",
            cursor: "grab",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {task}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;