"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar"; 
import Navbar from "@/app/components/dashboard/Navbar";
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
    <div className={styles.dashboard}>
        <Navbar />
     <Sidebar/>
      <main className={styles.content}>
        <h1 className={styles.title}>Bem-vindo ao seu painel!</h1>
        <p>Gerencie músicas, usuários, artistas e gêneros facilmente.</p>
      </main>
    </div>
  );
}