import React from "react";
import styles from "./Dialog.module.scss";

export default function Dialog({
  closeOnOutsideClick,
  onRequestClose,
  open,
  ...props
}) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  useDialogOpening(dialogRef, open);
  useDialogClosing(dialogRef, onRequestClose);

  const handleOutsideClick: React.ReactEventHandler = (event) => {
    const dialogNode = dialogRef?.current;
    if (closeOnOutsideClick && event?.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialogWrapper}
      onClick={handleOutsideClick}
    >
      <div className={styles.dialogContent} {...props} />
    </dialog>
  );
}

type TDialogRef = React.RefObject<HTMLDialogElement>

const useDialogOpening = (dialogRef: TDialogRef, open: boolean) => {
  const lastActiveElement = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    const dialogNode = dialogRef?.current;
    if (open) {
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
      lastActiveElement?.current?.focus();
    }
  }, [open]);
};

const useDialogClosing = (dialogRef: TDialogRef, onRequestClose: () => void) => {
  React.useEffect(() => {
    const dialogNode = dialogRef?.current;
    const handleCancel: EventListener = (event) => {
      event.preventDefault();
      onRequestClose();
    };
    dialogNode?.addEventListener("cancel", handleCancel);
    return () => {
      dialogNode?.removeEventListener("cancel", handleCancel);
    };
  }, [onRequestClose]);
};
