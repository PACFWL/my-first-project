"use client";
import React from "react";
import useMusicFormEdit from "@/app/hooks/useMusicFormEdit";
import styles from "../../../styles/music/MusicFormEdit.module.css";

 const MusicFormEdit: React.FC = () => {
  const {
    music,
    loading,
    formData,
    setFormData,
    handleChange,
    handleFileChange,
    handleSubmit,
    existingAlbumCover,
    removeAlbumCover,
    handleRemoveAlbumCover,
    handleMetadataChange,
    handleRemoveMetadata,
    handleAddMetadata
  } = useMusicFormEdit();

  if (loading) return <p>Carregando...</p>;
  if (!music) return <p className="text-red-500">Música não encontrada!</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Música</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" className={styles.input} required />
        <input name="artist" value={formData.artist} onChange={handleChange} placeholder="Artista" className={styles.input} required />
        <input name="album" value={formData.album} onChange={handleChange} placeholder="Álbum" className={styles.input} required />
        <input name="releaseYear" value={formData.releaseYear} onChange={handleChange} type="number" placeholder="Ano de Lançamento" className={styles.input} required />
        
        <input name="releaseDate" value={formData.releaseDate} onChange={handleChange} type="date" placeholder="Data de Lançamento" className={styles.input} />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Gênero (separado por vírgula)" className={styles.input} />
        <input name="featuredArtists" value={formData.featuredArtists} onChange={handleChange} placeholder="Artistas em Destaque" className={styles.input} /> 
        <label className={styles.checkboxContainer}>
          <input name="isExplicit" type="checkbox" checked={formData.isExplicit} onChange={handleChange} />
          Conteúdo Explícito
        </label>  
        <input name="duration" value={formData.duration} onChange={handleChange} type="number" placeholder="Duração (minutos)" className={styles.input} />
        <input name="rating" value={formData.rating} onChange={handleChange} type="number" placeholder="Avaliação (0-5)" className={styles.input} />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Preço" className={styles.input} />
        <label className={styles.select}>
  Qualidade de Áudio:
  <select
    name="audioQuality"
    value={formData.audioQuality}
    onChange={handleChange}
    className={styles.input}
  >
    <option value="">Selecione a Qualidade</option>
    <option value="UNKNOWN">Desconhecido</option>
    <option value="LOW">Baixa</option>
    <option value="MEDIUM">Média</option>
    <option value="HIGH">Alta</option>
    <option value="LOSSLESS">Sem Perdas (Lossless)</option>
  </select>
</label>

        <textarea name="lyrics" value={formData.lyrics} onChange={handleChange} placeholder="Letra da Música" className={styles.textarea}></textarea>
        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (separadas por vírgula)" className={styles.input} />
        <strong>Metadados:</strong>
        {Object.entries(formData.metadata).map(([key, value], index) => (
          <div key={index} className={styles.metadataContainer}>
            <input
              type="text"
              value={key}
              onChange={(e) => {
                const newKey = e.target.value;
                const newMetadata = { ...formData.metadata };
                newMetadata[newKey] = newMetadata[key];
                delete newMetadata[key];
                setFormData((prev) => ({
                  ...prev,
                  metadata: newMetadata,
                }));
              }}
              placeholder="Chave"
              className={styles.input}
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleMetadataChange(key, e.target.value)}
              placeholder="Valor"
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => handleRemoveMetadata(key)}
              className={styles.removeButton}
            >
              ✕
            </button>
          </div>
        ))}
        
        <button type="button" onClick={handleAddMetadata} className={styles.button}>
          + Adicionar Metadado
        </button>
        
        {existingAlbumCover && !removeAlbumCover ? (
          <div className={styles.albumContainer}>
            <img src={existingAlbumCover} alt="Capa do Álbum" className={styles.albumCover} />
            <button type="button" onClick={handleRemoveAlbumCover} className={styles.removeButton}>
              Remover Imagem
            </button>
          </div>
        ) : (
          <label className={styles.fileInputLabel}>
            Escolher uma imagem:
            <input type="file" onChange={handleFileChange} className={styles.input} />
          </label>
        )}

        <button type="submit" className={styles.button}>Salvar Alterações</button>
      </form>
    </div>
  );
};

export default MusicFormEdit;

//<input name="audioQuality" value={formData.audioQuality} onChange={handleChange} placeholder="Qualidade de Áudio" className={styles.input} />