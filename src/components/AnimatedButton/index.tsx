import styles from "./index.module.css";

type ButtonTypes = {
  right?: false | true;
  children: any;
  onClick: any;
  className?: string;
};

export default function AnimatedButton({
  right = false,
  children,
  onClick,
  className = "",
}: ButtonTypes) {
  return innerWidth > 1024 ? (
    <button
      className={`${styles.button} ${right ? styles.right : styles.left} font-sans ${className}`}
      style={{ pointerEvents: "auto" }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  ) : (
    <button
      className={`${styles.button} ${right ? styles.right : styles.left} font-sans ${className}`}
      style={{ pointerEvents: "auto" }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
