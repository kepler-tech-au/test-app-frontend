import React, { useState } from "react";

const AddCardModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({ name, description });
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add New Card</h2>
        <input
          type="text"
          placeholder="Name"
          className="modal-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="modal-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="modal-actions">
          <button className="modal-btn save-btn" onClick={handleSubmit}>
            Save
          </button>
          <button className="modal-btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
