"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPagedMusic } from "@/app/lib/musicApi";
import styles from "../../styles/MusicList.module.css";

const PagedMusicList = () => {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await getPagedMusic(page, pageSize);
        setMusicList(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Erro ao buscar músicas paginadas:", error);
      }
    };

    fetchMusic();
  }, [page]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Músicas Paginadas</h1>

      {musicList.length > 0 ? (
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

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className={styles.button}
        >
          Anterior
        </button>

        <span className={styles.pageInfo}>Página {page + 1} de {totalPages}</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className={styles.button}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default PagedMusicList;