import React from 'react';
// import './modal.css';

const Modal = ({isitems, show, onClose, title, children }) => {
  if (!show) {
    return null;
  }
  
  return (
    <div className={isitems ? 'modal-overlay modal-overlay-set-Index' : 'modal-overlay modal-overlay-set-Index-2'}>
      <div className={isitems ? 'Modal2' : 'modal'}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
