"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/presentation/LockScreen.module.css";

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState("+");
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

  useEffect(() => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 5) + 1;
    const operations = ["+", "×", "^", "!"];
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];

    setNum1(newNum1);
    setNum2(newNum2);
    setOperation(randomOperation);
  }, []);

  const checkAnswer = () => {
    let correctAnswer: number;
    switch (operation) {
      case "+": correctAnswer = num1 + num2; break;
      case "×": correctAnswer = num1 * num2; break;
      case "^": correctAnswer = Math.pow(num1, num2); break;
      case "!": correctAnswer = factorial(num1); break;
      default: return;
    }

    if (parseInt(answer) === correctAnswer) {
      setIsCorrect(true);
      setTimeout(onUnlock, 1000); 
    } else {
      alert("Resposta incorreta! Tente novamente.");
      setAnswer("");
    }
  };

  return (
    <motion.div
      className={styles.lockScreen}
      initial={{ opacity: 1 }}
      animate={isCorrect ? { opacity: 0, x: "-100%" } : { opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <p className={styles.question}>
        Resolva: {operation === "!" ? `${num1}!` : `${num1} ${operation} ${num2}`} = ?
      </p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className={styles.input}
        placeholder="Sua resposta"
      />
      <button onClick={checkAnswer} className={styles.checkButton}>
        Verificar
      </button>
    </motion.div>
  );
}
