import styles from "./index.module.css";

type ButtonTypes = {
  right?: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

export default function AnimatedButton({
  right = false,
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonTypes) {
  return innerWidth > 1024 ? (
    <button
      className={`${styles.button} ${right ? styles.right : styles.left} font-sans ${className}`}
      style={{ pointerEvents: "auto" }}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  ) : (
    <button
      className={`${styles.button} ${right ? styles.right : styles.left} font-sans ${className}`}
      style={{ pointerEvents: "auto" }}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
