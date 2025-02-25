"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMusicById, updateMusic } from "@/app/lib/musicApi";
import styles from "./EditMusicPage.module.css"

const EditMusicPage: React.FC = () => {
  const { id } = useParams();
  const musicId = Array.isArray(id) ? id[0] : id ?? ""; 
  const router = useRouter();
  const [music, setMusic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    releaseYear: "",
    releaseDate: "",
    genre: "",
    featuredArtists: "",
    isExplicit: false,
    duration: "",
    rating: "",
    price: "",
    audioQuality: "",
    lyrics: "",
    tags: "",
    metadata: {} as Record<string, string>,
    albumCover: "",
  });

  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [removeAlbumCover, setRemoveAlbumCover] = useState(false);
  useEffect(() => {
    if (musicId) {
      fetchMusicDetails(musicId);
    }
  }, [musicId]);

  const fetchMusicDetails = async (musicId: string) => {
    setLoading(true);
    try {
      const data = await getMusicById(musicId);
      console.log("Dados recebidos na edição:", data);
      setMusic(data);
      setFormData({
        title: data.title,
        artist: data.artist,
        album: data.album,
        releaseYear: data.releaseYear.toString(),
        releaseDate: data.releaseDate || "",
        genre: data.genre ? data.genre.join(", ") : "",
        featuredArtists: data.featuredArtists ? data.featuredArtists.join(", ") : "",
        isExplicit: data.explicit || false, 
        duration: data.duration ? data.duration.toString() : "",
        rating: data.rating ? data.rating.toString() : "",
        price: data.price || "",
        audioQuality: data.audioQuality || "",
        lyrics: data.lyrics || "",
        tags: data.tags ? data.tags.join(", ") : "",
        metadata: data.metadata || {},
        albumCover: data.albumCoverImage || "",
      });
    } catch (error) {
      console.error("Erro ao buscar detalhes da música:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAlbumCover(e.target.files[0]);
    }
  };

  const handleRemoveAlbumCover = () => {
    setAlbumCover(null);
    setFormData((prev) => ({ ...prev, albumCover: '' }));
    setRemoveAlbumCover(true);
  };

  const handleKeepAlbumCover = () => {
    setRemoveAlbumCover(false);
  };


  const handleMetadataChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value },
    }));
  };
  
  const handleRemoveMetadata = (key: string) => {
    const newMetadata = { ...formData.metadata };
    delete newMetadata[key];
    setFormData((prev) => ({
      ...prev,
      metadata: newMetadata,
    }));
  };
  
  const handleAddMetadata = () => {
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, "": "" }, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedMusic = {
      ...formData,
      releaseYear: parseInt(formData.releaseYear),
      genre: formData.genre.split(",").map((g) => g.trim()),
      featuredArtists: formData.featuredArtists.split(",").map((a) => a.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
      metadata: formData.metadata,
      albumCover: removeAlbumCover ? undefined : albumCover || formData.albumCover,
    };
  
    console.log("🎵 Dados enviados:", updatedMusic);
    console.log("📷 Arquivo enviado:", albumCover);
    
    try {
      await updateMusic(musicId, updatedMusic, albumCover || undefined);
      alert("Música atualizada com sucesso!");
      router.push(`/music/details/${musicId}`);
    } catch (error) {
      console.error("Erro ao atualizar música:", error);
      alert("Erro ao atualizar música. Verifique os dados e tente novamente.");
    }
  };

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
        <input name="audioQuality" value={formData.audioQuality} onChange={handleChange} placeholder="Qualidade de Áudio" className={styles.input} />
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
  
        {formData.albumCover && !removeAlbumCover && (
          <img
            src={`data:image/jpeg;base64,${formData.albumCover}`}
            alt="Capa do Álbum"
            className={styles.albumCover}
          />
        )}
  
        <div className={styles.metadataContainer}>
          <button
            type="button"
            onClick={handleKeepAlbumCover}
            className={`${styles.button} ${removeAlbumCover ? styles.disabledButton : ''}`}
          >
            Manter Imagem
          </button>
  
          <button
            type="button"
            onClick={handleRemoveAlbumCover}
            className={styles.removeButton}
          >
            Remover Imagem
          </button>
        </div>
  
        <label className={styles.form}>
          Capa do Álbum:
          <input type="file" onChange={handleFileChange} className={styles.input} />
        </label>
  
        <button type="submit" className={styles.button}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
  
};

export default EditMusicPage;
