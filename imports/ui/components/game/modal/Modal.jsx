import React, { useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
const Modal = props => {
  const firstButtonRef = useRef(null);
  const lastButtonRef = useRef(null);

  useLayoutEffect(() => {
    if (firstButtonRef.current) firstButtonRef.current.focus();
  }, [
    (() => {
      return firstButtonRef.current;
    })()
  ]);

  const trapTab = e => {
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstButtonRef.current) {
          e.preventDefault();
          lastButtonRef.current.focus();
        }
      } else {
        if (document.activeElement === lastButtonRef.current) {
          e.preventDefault();
          firstButtonRef.current.focus();
        }
      }
    }
    if (e.key === "Escape") {
      props.closeModal();
    }
  };

  return (
    <div className='modal'>
      <div className='modal__backdrop' onClick={props.closeModal}></div>
      <div className='modal__body' onKeyDown={trapTab} tabIndex='0'>
        <h4 className='modal__title'>Don´t be a dropout</h4>
        <button
          ref={firstButtonRef}
          className='modal__close'
          alt='Close icon'
          src={"/icons/close.svg"}
          onClick={props.closeModal}
        />
        <div className='modal__content'>
          Are you sure you wanna leave the game? You´ll be punished by losing
          2000 points :(
        </div>
        <div className='modal__footer'>
          <button
            className='game__button game__button--cancel'
            onClick={props.closeModal}>
            NO
          </button>
          <button
            ref={lastButtonRef}
            className='game__button game__button--ok'
            onClick={() => {
              props.closeModal();
              props.finishGame();
            }}>
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  finishGame: PropTypes.func.isRequired
};

export default Modal;
