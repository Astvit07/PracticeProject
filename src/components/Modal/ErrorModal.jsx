import React from 'react';
import Modal from "../Modal/Modal";

function ErrorModal({ isOpen, onClose, errorMessage }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>{errorMessage}</Modal.Header>
      <Modal.Actions>
        <button onClick={onClose}>
          Ok
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default ErrorModal;
