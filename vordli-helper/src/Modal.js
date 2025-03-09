import { createPortal } from "react-dom";
import { useEffect } from "react";

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
    <div className="ModalOverlay" onClick={onClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
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
