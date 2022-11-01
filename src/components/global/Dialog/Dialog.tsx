import { ReactEventHandler, RefObject, useEffect, useRef } from "react";
import { useDialogPolyfill } from "./useDialogPolyfill";
import styles from "./Dialog.module.scss";

export default function Dialog({
  closeOnOutsideClick,
  onRequestClose,
  open,
  ...props
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useDialogPolyfill(dialogRef);
  useDialogOpening(dialogRef, open);
  useDialogClosing(dialogRef, onRequestClose);

  const handleOutsideClick: ReactEventHandler = (event) => {
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

const useDialogOpening = (dialogRef: RefObject<HTMLDialogElement>, open: boolean) => {
  const lastActiveElement = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialogNode = dialogRef?.current;
    if (open) {
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
      lastActiveElement?.current?.focus();
    }
  }, [open]);
};

const useDialogClosing = (dialogRef: RefObject<HTMLDialogElement>, onRequestClose: VoidFunction) => {
  useEffect(() => {
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
