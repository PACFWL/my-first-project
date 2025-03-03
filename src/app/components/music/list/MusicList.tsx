"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useMusicList from "@/app/hooks/useMusicList";
import styles from "../../../styles/music/MusicList.module.css";


const MusicList: React.FC = () => {
  const router = useRouter();
  const {
    musicList,
    loading
  } = useMusicList();

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
}

export default MusicList;