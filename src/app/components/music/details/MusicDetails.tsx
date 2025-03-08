"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useMusicDetails from "@/app/hooks/music/useMusicDetails";
import AlbumCover from "./AlbumCover";
import MusicInfo from "./MusicInfo";
import { deleteMusic } from "@/app/lib/music/musicApi";
import styles from "../../../styles/music/MusicDetails.module.css";

const MusicDetails: React.FC<{ id: string }> = ({ id }) => {
  const { music, loading } = useMusicDetails(id);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!music) return;

    try {
      await deleteMusic(music.id);
      alert("Música excluída com sucesso!");
      router.push("/music/list");
    } catch (error) {
      console.error("Erro ao excluir música:", error);
    } finally {
      setShowModal(false); 
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (!music) return <p className="text-red-500">Música não encontrada!</p>;

  return (
    <div className={styles.container}>
      {music.albumCoverImage && <AlbumCover albumCoverImage={music.albumCoverImage} title={music.title} />}

      <h2 className={styles.title}>Título: {music.title}</h2>
      <p className={styles.artist}>Artista: {music.artist} - Álbum: {music.album} - Ano: ({music.releaseYear})</p>

      <MusicInfo music={music} />

      <p className="mt-4"><strong>Letra:</strong></p>
      <pre className={styles.lyrics}>{music.lyrics}</pre>

      <button onClick={() => setShowModal(true)} className={`${styles.button} ${styles.deleteButton}`}>
        Excluir Música
      </button>

      <button onClick={() => router.push(`/music/edit/${music.id}`)} className={`${styles.button} ${styles.editButton}`}>
        Editar Música
      </button>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.message}>Confirmar Exclusão</h3>
            <p className={styles.message}>Tem certeza de que deseja excluir a música "{music.title}"?</p>
            <div className={styles.modalActions}>
              <button onClick={handleDelete} className={styles.confirmButton}>Sim, excluir</button>
              <button onClick={() => setShowModal(false)} className={styles.cancelButton}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicDetails;
