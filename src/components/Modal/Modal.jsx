import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

import { useEffect } from 'react';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, tags }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') onClose(); //close modal on click Esc
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose(); // close modal on backdrop click
    }
  };

  return createPortal(
    <Overlay className="overlay" onClick={handleBackdropClick}>
      <ModalContent className="modal">
        <img src={largeImageURL} alt={tags} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
