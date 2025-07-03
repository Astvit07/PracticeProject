export default function ModalActions({ children, className = '' }) {
  return (
    <footer className={`modal-actions ${className}`}>
      {children}
    </footer>
  );
}
