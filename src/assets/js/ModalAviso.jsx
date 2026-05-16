import React from "react";

const ModalAviso = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Notificação do Sistema</h3>
        <p>{message}</p>
        <button onClick={onClose} style={buttonStyle}>
          Fechar
        </button>
      </div>
    </div>
  );
};

// Estilos básicos (Você pode mover para um arquivo .css)
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
  textAlign: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
};

const buttonStyle = {
  marginTop: "15px",
  padding: "8px 16px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

export default ModalAviso;
