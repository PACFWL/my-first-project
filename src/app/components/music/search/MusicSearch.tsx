"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMusicSearch } from "@/app/hooks/music/useMusicSearch";
import styles from "../../../styles/music/MusicSearch.module.css";

const MusicSearch: React.FC = () => {
  const router = useRouter();
  const { searchParams, setSearchParams, results, loading, error } = useMusicSearch();
  const [form, setForm] = useState(searchParams);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data before submission:", form); 
    setSearchParams({ ...form });
  };

  return (
    <div className={styles.container}>
      <h2>Pesquisa Avançada</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
      <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title || ""}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="text"
          name="artist"
          placeholder="Artista"
          value={form.artist || ""}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="text"
          name="album"
          placeholder="Álbum"
          value={form.album || ""}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Ano de Lançamento"
          value={form.releaseYear || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minRating"
          placeholder="Nota mínima (0-10)"
          value={form.minRating || ""}
          onChange={handleChange}
        />

        <label className={styles.label}>
          Conteúdo Explícito:
          <select name="isExplicit" value={form.isExplicit === undefined ? "" : String(form.isExplicit)} onChange={handleChange}>
            <option value="">Indiferente</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </label>

        <label className={styles.label}>
        Sem Letra:
        <select name="noLyrics" value={form.noLyrics === undefined ? "" : String(form.noLyrics)} onChange={handleChange}>
          <option value="">Indiferente</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </label>

        <input
          type="text"
          name="lyricsKeywords"
          placeholder="Palavras-chave na letra"
          value={form.lyricsKeywords || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <label className={styles.label}>
          Correspondência exata:
          <select name="exactLyricsMatch" value={form.exactLyricsMatch === undefined ? "" : String(form.exactLyricsMatch)} onChange={handleChange}>
            <option value="">Indiferente</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </label>

        <button type="submit" className={styles.searchButton} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.results}>
        {results.length > 0 ? (
          results.map((music, index) => (
            <div key={index} className={styles.musicCard}>
              <div className={styles.info}>
              <img
                src={`data:image/jpeg;base64,${music.albumCoverImage}`}
                alt={music.title}
                className={styles.albumCover}
              />
              <h3>{music.title}</h3>
              <p>Artista: {music.artist}</p>
              <p>Álbum: {music.album}</p>
              <p>Ano: {music.releaseYear}</p>
              </div>
              <button
              onClick={() => router.push(`/music/details/${music.id}`)}
              className={styles.button}
            >
              Visualizar Dados
            </button>
            </div>
          ))
        ) : (
          !loading && <p>Nenhuma música encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default MusicSearch;