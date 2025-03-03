"use client";

import { useState } from "react";
import LockScreen from "./components/presentation/LockScreen";
import WelcomeScreen from "./components/presentation/WelcomeScreen";
import styles from "./page.module.css";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className={styles.container}>
      {!isUnlocked && <LockScreen onUnlock={() => setIsUnlocked(true)} />}
      {isUnlocked && <WelcomeScreen />}
    </div>
  );
}