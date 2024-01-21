import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function LoadingScreen({ shapesLoader = false, onLoad = () => {} }) {
  return shapesLoader ? <ShapesLoaderComponent /> : <ProgressBarComponent onLoad={onLoad} />;
}

function ProgressBarComponent({ onLoad = () => {} }) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
    onLoad();
  }, []);

  return (
    <div className="max-w-7xl w-[90%]">
      <div className="h-16 border-[2px] border-[#343434] rounded-full p-1 overflow-hidden">
        <div
          className={`rounded-full bg-[#343434] h-full transition-all duration-100 ${
            startAnimation && styles.innerBar
          }`}
        ></div>
      </div>
    </div>
  );
}

function ShapesLoaderComponent() {
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
    }, 1500);

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
