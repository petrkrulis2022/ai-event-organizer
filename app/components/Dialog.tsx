import React from "react";

interface DialogProps {
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ onClose }) => {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="dialog-close-button">
          Close
        </button>
        <div className="dialog-content">
          {/* Add your dialog content here */}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

// Add the following CSS to your global styles or a CSS module
/*
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.dialog-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
*/
