"use client";
import React from "react";
import useMusicFormAdd from "@/app/hooks/music/useMusicFormAdd";
import styles from "../../../styles/music/MusicFormAdd.module.css";

const MusicFormAdd: React.FC = () => {
  const {
    formData,
    previewImage,
    loading,
    handleChange,
    handleFileChange,
    handleMetadataChange,
    handleRemoveMetadata,
    handleAddMetadata,
    handleSubmit
  } = useMusicFormAdd();

return (
  <div className={styles.container}>
    <h1 className={styles.title}>Adicionar Nova Música</h1>
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} className={styles.input} required />
      <input type="text" name="artist" placeholder="Artista" value={formData.artist} onChange={handleChange} className={styles.input} required />
      <input type="text" name="album" placeholder="Álbum" value={formData.album} onChange={handleChange} className={styles.input} />
      <input type="number" name="releaseYear" placeholder="Ano de Lançamento" value={formData.releaseYear} onChange={handleChange} className={styles.input} required />
      <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} className={styles.input} />
      <input type="text" name="genre" placeholder="Gênero (separado por vírgulas)" value={formData.genre} onChange={handleChange} className={styles.input} />
      <input type="text" name="featuredArtists" placeholder="Artistas em Destaque (separado por vírgulas)" value={formData.featuredArtists} onChange={handleChange} className={styles.input} />
      
      <div className={styles.checkboxContainer}>
        <input type="checkbox" name="isExplicit" checked={formData.isExplicit} onChange={handleChange} />
        <label>Conteúdo Explícito</label>
      </div>

      <input type="number" name="duration" placeholder="Duração (minutos)" value={formData.duration} onChange={handleChange} className={styles.input} />
      <input type="number" step="0.1" name="rating" placeholder="Avaliação (0-5)" value={formData.rating} onChange={handleChange} className={styles.input} />
      <input type="text" name="price" placeholder="Preço (R$)" value={formData.price} onChange={handleChange} className={styles.input} />

      <label className={styles.select}>
        Qualidade de Áudio:
        <select name="audioQuality" value={formData.audioQuality} onChange={handleChange} className={styles.input}>
          <option value="">Selecione a Qualidade</option>
          <option value="UNKNOWN">Desconhecido</option>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
          <option value="LOSSLESS">Sem Perdas (Lossless)</option>
        </select>
      </label>

      <textarea name="lyrics" placeholder="Letra da Música" value={formData.lyrics} onChange={handleChange} className={styles.textarea} />
      <input type="text" name="tags" placeholder="Tags (separado por vírgulas)" value={formData.tags} onChange={handleChange} className={styles.input} />

      <strong>Metadados:</strong>
      {Object.entries(formData.metadata).map(([key, value], index) => (
        <div key={index} className={styles.metadataContainer}>
          <input type="text" value={key} onChange={(e) => handleMetadataChange(key, e.target.value, value)} placeholder="Chave" className={styles.input} />
          <input type="text" value={value} onChange={(e) => handleMetadataChange(key, key, e.target.value)} placeholder="Valor" className={styles.input} />
          <button type="button" onClick={() => handleRemoveMetadata(key)} className={styles.removeButton}>✕</button>
        </div>
      ))}

      <button type="button" onClick={handleAddMetadata} className={styles.button}>
        + Adicionar Metadado
      </button>

      <input type="file" onChange={handleFileChange} className={styles.fileInput} />
      {previewImage && <img src={previewImage} alt="Preview da Capa" className={styles.previewImage} />}
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Salvando..." : "Adicionar Música"}
      </button>
    </form>
  </div>
);
}

export default MusicFormAdd;