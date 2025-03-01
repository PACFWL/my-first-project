
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useMusicDetails from "@/app/hooks/useMusicDetails";
import AlbumCover from "./AlbumCover";
import MusicInfo from "./MusicInfo";
import { deleteMusic } from "@/app/lib/music/musicApi";
import styles from "../../styles/music/MusicDetails.module.css";

const MusicDetails: React.FC<{ id: string }> = ({ id }) => {
  const { music, loading } = useMusicDetails(id);
  const router = useRouter();

  const handleDelete = async () => {
    if (!music) return;

    if (window.confirm(`Deseja realmente excluir a música "${music.title}"?`)) {
      try {
        await deleteMusic(music.id);
        alert("Música excluída com sucesso!");
        router.push("/music/list");
      } catch (error) {
        console.error("Erro ao excluir música:", error);
      }
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (!music) return <p className="text-red-500">Música não encontrada!</p>;

  return (
    <div className={styles.container}>
      {music.albumCoverImage && <AlbumCover albumCoverImage={music.albumCoverImage} title={music.title} />}

      <h2 className={styles.title}>{music.title}</h2>
      <p className={styles.artist}>{music.artist} - {music.album} ({music.releaseYear})</p>

      <MusicInfo music={music} />

      <p className="mt-4"><strong>Letra:</strong></p>
      <pre className={styles.lyrics}>{music.lyrics}</pre>

      <button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>
        Excluir Música
      </button>

      <button onClick={() => router.push(`/music/edit/${music.id}`)} className={`${styles.button} ${styles.editButton}`}>
        Editar Música
      </button>
    </div>
  );
};

export default MusicDetails;
