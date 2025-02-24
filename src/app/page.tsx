"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css"; 

export default function Home() {
  const router = useRouter();

  return (

    <div className={styles.container}>
 <h1 className="text-3xl font-bold mb-6">Usuário</h1>
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
    </div>
  );
}
