import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalDiv = document.querySelector('#modal');

export const Modal = ({ onBackdropClick, tags, largeImg }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleKeydown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  return ReactDOM.createPortal(
    <StyledOverlay onClick={onBackdropClick}>
      <StyledModal>
        <img src={largeImg} alt={tags} />
      </StyledModal>
    </StyledOverlay>,
    modalDiv
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
};
