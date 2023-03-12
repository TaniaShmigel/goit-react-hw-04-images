import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onShow }) => {
  const handleKey = e => {
    if (e.code === 'Escape') {
      onShow();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  });

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onShow();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
