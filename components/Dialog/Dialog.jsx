import React, { useEffect, useRef } from "react";

import { useDialogPolyfill } from "./useDialogPolyfill";
import styles from './Dialog.module.scss';

export default function Dialog({ closeOnOutsideClick, onRequestClose, open, ...props }) {
  const dialogRef = useRef();

  useDialogPolyfill(dialogRef);
  useDialogOpening(dialogRef, open);
  useDialogClosing(dialogRef, onRequestClose);

  function handleOutsideClick(event) {
    const dialogNode = dialogRef.current;
    if (closeOnOutsideClick && event.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.dialogWrapper} onClick={handleOutsideClick}>
      <div className={styles.dialogContent} {...props} />
    </dialog>
  );
}

const useDialogOpening = (dialogRef, open) => {
  const lastActiveElement = useRef(null);
  useEffect(() => {
      const dialogNode = dialogRef.current;
      if (open) {
        lastActiveElement.current = document.activeElement;
        dialogNode.showModal();
      } else {
        dialogNode.close();
        lastActiveElement.current.focus();
      }
  }, [open]);
};

const useDialogClosing = (dialogRef, onRequestClose) => {
  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = event => {
      event.preventDefault();
      onRequestClose();
    };
    dialogNode.addEventListener("cancel", handleCancel);
    return () => {
      dialogNode.removeEventListener("cancel", handleCancel);
    };
  }, [onRequestClose]);
};
