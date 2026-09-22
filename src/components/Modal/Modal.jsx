import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
  return <div className={`${styles.root} backdrop open`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal"><button type="button" className={styles.close} onClick={onClose} aria-label="ปิดหน้าต่าง">×</button>{children}</div></div>;
}