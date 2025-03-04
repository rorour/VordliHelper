import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ModalTop">
          <button className="ModalClose" onClick={onClose}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
        <div className="ModalBody">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
