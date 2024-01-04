import styles from "./index.module.css";

type ButtonTypes = {
  right?: false | true;
  children: any;
  onClick: any;
};

export default function AnimatedButton({ right = false, children, onClick }: ButtonTypes) {
  return (
    <button
      className={`${styles.button} ${right ? styles.right : styles.left}`}
      style={{ pointerEvents: "auto" }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
