import { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalActions from './ModalActions';
import './Modal.css';

const ModalContext = createContext();

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('Modal components must be wrapped by <Modal>');
  }
  return ctx;
}

export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  const modalContent = (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <ModalContext.Provider value={{ onClose }}>
        <div className="modal">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </ModalContext.Provider>
    </>
  );

  return createPortal(
    modalContent,
    document.getElementById('modal-root') || document.body
  );
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;
