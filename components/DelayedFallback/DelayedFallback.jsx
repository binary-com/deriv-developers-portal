import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./DelayedFallback.module.scss";

export default function DelayedFallback() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {show && (
        <div className={styles.centralSpinner}>
          <Spinner />
        </div>
      )}
    </>
  );
}
