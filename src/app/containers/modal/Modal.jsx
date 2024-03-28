import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './modal.css';

const Modal = forwardRef(function Modal(
  { className, children, ...props },
  ref
) {
  const dialogRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => dialogRef.current.showModal(),
        close: () => dialogRef.current.close(),
      };
    },
    []
  );

  return createPortal(
    <dialog
      {...props}
      className={`modal${className ? ' ' + className : ''}`}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root')
  );
});

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
