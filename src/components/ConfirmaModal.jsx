import React from "react";
import "../styles/ConfirmaModal.css";

const ConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir esta conta?</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
          <button className="confirm-btn" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
