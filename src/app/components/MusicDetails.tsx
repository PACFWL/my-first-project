"use client";

import React, { useEffect, useState } from "react";
import { getMusicById, deleteMusic } from "@/app/lib/musicApi";
import { useRouter } from "next/navigation";
import styles from "./MusicDetails.module.css";

interface Music {
  id: string;
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  releaseDate?: string;
  genre?: string[];
  featuredArtists?: string[];
  explicit?: boolean;
  duration?: number;
  rating?: number;
  price?: string;
  albumCoverImage?: string;
  audioQuality?: string;
  lyrics: string;
  tags?: string[];
  metadata?: Record<string, string>;
}

const MusicDetails: React.FC<{ id: string }> = ({ id }) => {
  const [music, setMusic] = useState<Music | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (id) {
      fetchMusicDetails(id);
    }
  }, [id]);

  const fetchMusicDetails = async (musicId: string) => {
    setLoading(true);
    try {
      const data = await getMusicById(musicId);
      console.log("Música carregada:", data); 
      setMusic(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da música:", error);
    }
    setLoading(false);
  };
  

  const handleDelete = async () => {
    if (!music) return;

    if (window.confirm(`Deseja realmente excluir a música "${music.title}"?`)) {
      try {
        await deleteMusic(music.id);
        alert("Música excluída com sucesso!");
        router.push("/music-list"); 
      } catch (error) {
        console.error("Erro ao excluir música:", error);
      }
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (!music) return <p className="text-red-500">Música não encontrada!</p>;

  return (
    <div className={styles.container}>
     {music.albumCoverImage && (
  <>
    <img
      src={`data:image/jpeg;base64,${music.albumCoverImage}`}
      alt={music.title}
      className={styles.albumCover}
      onClick={toggleModal}
    />

    {showModal && (
      <div className={styles.modalOverlay} onClick={toggleModal}>
        <div className={styles.modalContent}>
          <img
            src={`data:image/jpeg;base64,${music.albumCoverImage}`}
            alt={music.title}
            className={styles.modalImage}
          />
        </div>
      </div>
    )}
  </>
)}

      <h2 className={styles.title}>{music.title}</h2>
      <p className={styles.artist}>
        {music.artist} - {music.album} ({music.releaseYear})
      </p>
  
      <div className={styles.details}>
        {music.releaseDate && <p><strong>Data de Lançamento:</strong> {music.releaseDate}</p>}
        {music.genre && <p><strong>Gênero:</strong> {music.genre.join(", ")}</p>}
        {music.featuredArtists && music.featuredArtists.length > 0 && (
          <p><strong>Artistas em Destaque:</strong> {music.featuredArtists.join(", ")}</p>
        )}
        {music.explicit !== undefined && (
          <p><strong>Conteúdo Explícito:</strong> {music.explicit ? "Sim" : "Não"}</p>
        )}
        {music.duration && <p><strong>Duração:</strong> {music.duration} minutos</p>}
        {music.rating && <p><strong>Avaliação:</strong> {music.rating}/5</p>}
        {music.price && <p><strong>Preço:</strong> R$ {music.price}</p>}
        {music.audioQuality && <p><strong>Qualidade de Áudio:</strong> {music.audioQuality}</p>}
        {music.tags && <p><strong>Tags:</strong> {music.tags.join(", ")}</p>}
      </div>
  
      <p className="mt-4"><strong>Letra:</strong></p>
      <pre className={styles.lyrics}>{music.lyrics}</pre>
  
      <button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>
        Excluir Música
      </button>
      
      <button onClick={() => router.push(`/edit-music/${music.id}`)} className={`${styles.button} ${styles.editButton}`}>
        Editar Música
      </button>
    </div>
  );
  
};

export default MusicDetails;
