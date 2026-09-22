import styles from "./Toast.module.css";

export default function Toast({ message }) {
  return (
    <div
      className={`${styles.root} toast ${message ? "show" : ""}`}
      role="status"
    >
      {message}
    </div>
  );
}
