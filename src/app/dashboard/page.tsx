"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/dashboard/page.module.css"; 

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/users/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p>Bem-vindo ao seu painel!</p>
        <h1 className={styles.title}>Gerenciamento de Músicas</h1>
      <div className={styles.buttonContainer}>
        <button onClick={() => router.push("/music/list")} className={styles.button}>
          Listagem de Músicas
        </button>
        <button onClick={() => router.push("/music/add")} className={styles.button}>
          Adicionar Nova Música
        </button>
        <button onClick={() => router.push("/music/paged")} className={styles.button}>
          Listagem de paginação
        </button>
      </div> 
    </div>
  );
}
