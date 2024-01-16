import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function LoadingScreen() {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 5) + 1);

  useEffect(() => {
    let lastNum: number;

    let interval = setInterval(() => {
      let num;

      do {
        num = Math.floor(Math.random() * 5) + 1;
      } while (num === lastNum);

      lastNum = num;

      setRandomNumber(num);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div data-config={randomNumber} className={styles.container}>
      <div className={styles.shapes}></div>
      <div className={styles.shapes}></div>
      <div className={styles.shapes}></div>
      <div className={styles.shapes}></div>
      <div className={styles.shapes}></div>
      <div className={styles.shapes}></div>
      <div className={styles.shapes}></div>
    </div>
  );
}
