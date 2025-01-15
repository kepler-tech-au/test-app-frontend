import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { fetchCards, addCard, updateCard } from "./services/api";
import List from "./components/ui/List";
import AddCardModal from "./components/AddCardModal";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadCards = async () => {
      const fetchedCards = await fetchCards();
      setCards(fetchedCards);
    };
    loadCards();

    // Listen for card updates from Socket.IO
    socket.on("cardUpdated", (updatedCard) => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        )
      );
    });

    return () => {
      socket.off("cardUpdated");
    };
  }, []);

  const handleAddCard = async (list) => {
    setSelectedList(list);
    setModalOpen(true);
  };

  const handleSaveCard = async (card) => {
    const newCard = await addCard({ ...card, list: selectedList });
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setCards((prev) => {
        const oldIndex = prev.findIndex((card) => card._id === active.id);
        const newIndex = prev.findIndex((card) => card._id === over.id);

        const updatedCards = arrayMove(prev, oldIndex, newIndex);

        // Emit the updated cards through Socket.IO
        socket.emit("cardUpdated", updatedCards);

        return updatedCards;
      });

      // Update the card position in the backend (optional)
      const updatedCard = cards.find((card) => card._id === active.id);
      updatedCard.list = over.id;
      await updateCard(updatedCard._id, { list: over.id });
    }
  };

  const listACards = cards.filter((card) => card.list === "List A");
  const listBCards = cards.filter((card) => card.list === "List B");

  return (
    <div className="app-container">
      <h1 className="app-title">Trello-like App</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="lists-container">
          <SortableContext items={listACards.map((card) => card._id)}>
            <List title="List A" cards={listACards} onAddCard={handleAddCard} />
          </SortableContext>
          <SortableContext items={listBCards.map((card) => card._id)}>
            <List title="List B" cards={listBCards} onAddCard={handleAddCard} />
          </SortableContext>
        </div>
      </DndContext>
      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCard}
      />
    </div>
  );
};

export default App;
