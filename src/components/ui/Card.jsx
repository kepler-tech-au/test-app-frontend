import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Card = ({ card }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: card._id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`card-container ${isDragging ? "dragging" : ""}`}
    >
      <h3 className="card-title">{card.name}</h3>
      <p className="card-description">{card.description}</p>
    </div>
  );
};

export default Card;
