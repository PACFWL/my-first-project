"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css"; 

export default function HomeTeste() {
  const router = useRouter();

  return (

    <div className={styles.container}>
 <h1 className="text-3xl font-bold mb-6">Gerenciamento de User</h1>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => router.push("/users/login")} 
          className={styles.buttonBlue}>
          Login
        </button>
        <button
          onClick={() => router.push("/users/register")}
          className={styles.buttonGreen}>
          Registrar
        </button>
      </div>
      <h1 className={styles.title}>Gerenciamento de Músicas</h1>
      <div className={styles.buttonContainer}>
        <button onClick={() => router.push("/music/list")} className={styles.buttonBlue}>
          Listagem de Músicas
        </button>
        <button onClick={() => router.push("/music/add")} className={styles.buttonGreen}>
          Adicionar Nova Música
        </button>
      </div>      
    </div>
  );
}
