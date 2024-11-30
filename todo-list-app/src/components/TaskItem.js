import React, { useState, useRef, useEffect } from "react";

const TaskItem = ({ task, toggleComplete, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  const handleEdit = () => {
    if (newName.trim()) {
      editTask(task.id, newName);
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
        />
      ) : (
        <>
          <span onClick={() => toggleComplete(task.id)}>{task.name}</span>
          <button className="edit" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
