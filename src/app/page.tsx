
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        Bem-vindo!
      </motion.h1>

      <p className={styles.subtitle}>Acesse sua conta ou crie uma nova.</p>

      <motion.div 
        className={styles.buttonContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}>
        
        <button onClick={() => router.push("/users/login")} className={styles.button}>
          Login
        </button>
        
        <button onClick={() => router.push("/users/register")} className={styles.buttonOutline}>
          Registrar
        </button>
      </motion.div>
    </div>
  );
}
