"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "../../styles/presentation/WelcomeScreen.module.css";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <motion.div
      className={styles.content}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Bem-vindo!
      </motion.h1>

      <p className={styles.subtitle}>Acesse sua conta ou crie uma nova.</p>

      <motion.div
        className={styles.buttonContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button
          onClick={() => router.push("/users/login")}
          className={styles.button}
        >
          Login
        </button>

        <button
          onClick={() => router.push("/users/register")}
          className={styles.buttonOutline}
        >
          Registrar
        </button>
      </motion.div>
    </motion.div>
  );
}
