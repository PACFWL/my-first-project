
"use client";

import MusicDetails from "@/app/components/details/MusicDetails";
import { useParams } from "next/navigation";
import styles from "../../../styles/music/MusicDetailsPage.module.css";

export default function MusicDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <p className="text-red-500">ID da música não encontrado!</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes da Música</h1>
      <MusicDetails id={id} />
    </div>
  );
}