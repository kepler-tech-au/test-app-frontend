import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

const List = ({ title, cards, onAddCard }) => {
  const { setNodeRef, isOver } = useDroppable({ id: title });

  return (
    <div
      ref={setNodeRef}
      className={`list-container ${isOver ? "highlight" : ""}`}
    >
      <h2 className="list-title">{title}</h2>
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
      <button className="add-card-btn" onClick={() => onAddCard(title)}>
        Add Card
      </button>
    </div>
  );
};

export default List;
