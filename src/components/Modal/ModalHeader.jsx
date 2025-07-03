import { useModalContext } from './Modal';

export default function ModalHeader({ children, className = '' }) {
  const { onClose } = useModalContext();
  
  return (
    <header className={`modal-header ${className}`}>
      {children}
      <button className="modal-close" onClick={onClose}>&times;</button>
    </header>
  );
}
