import React from "react";
import styles from "../styles/MusicDetails.module.css";

const MusicInfo: React.FC<{ music: any }> = ({ music }) => {
  return (
    <div className={styles.details}>
      {music.releaseDate && <p><strong>Data de Lançamento:</strong> {music.releaseDate}</p>}
      {music.genre && <p><strong>Gênero:</strong> {music.genre.join(", ")}</p>}
      {music.featuredArtists?.length > 0 && (
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
  );
};

export default MusicInfo;
