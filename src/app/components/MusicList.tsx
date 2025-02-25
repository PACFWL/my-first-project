"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllMusic } from "@/app/lib/musicApi";
import styles from "../styles/MusicList.module.css";

const MusicList: React.FC = () => {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMusic();
  }, []);
  
  const fetchMusic = async () => {
    setLoading(true);
    try {
      const data = await getAllMusic();
      setMusicList(data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
    setLoading(false);
  };
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Músicas</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : musicList.length > 0 ? (
        <div className={styles.grid}>
          {musicList.map((music) => (
            <div key={music.id} className={styles.card}>
              <div className={styles.info}>
                <h3 className={styles.musicTitle}>{music.title}</h3>
                <img
                  src={`data:image/jpeg;base64,${music.albumCoverImage}`}
                  alt={music.title}
                  className={styles.albumCover}
                />
                <p className={styles.details}>{music.artist} - {music.album}</p>
              </div>
              <button
                onClick={() => router.push(`/music/details/${music.id}`)}
                className={styles.button}
              >
                Visualizar Dados
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma música encontrada.</p>
      )}
    </div>
  );
};

export default MusicList;
