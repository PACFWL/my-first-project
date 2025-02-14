"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMusicById, updateMusic } from "@/app/lib/musicApi";

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
  });
  const [albumCover, setAlbumCover] = useState<File | null>(null);

  useEffect(() => {
    if (musicId) {
      fetchMusicDetails(musicId);
    }
  }, [musicId]);

  const fetchMusicDetails = async (musicId: string) => {
    setLoading(true);
    try {
      const data = await getMusicById(musicId);
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
      metadata: { ...prev.metadata, "": "" }, // Adiciona uma nova entrada vazia
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
    };
  
    try {
      await updateMusic(musicId, updatedMusic, albumCover || undefined);
      alert("Música atualizada com sucesso!");
      router.push(`/music-details/${musicId}`);
    } catch (error) {
      console.error("Erro ao atualizar música:", error);
      alert("Erro ao atualizar música. Verifique os dados e tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!music) return <p className="text-red-500">Música não encontrada!</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Editar Música</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" className="border p-2 rounded" required />
        <input name="artist" value={formData.artist} onChange={handleChange} placeholder="Artista" className="border p-2 rounded" required />
        <input name="album" value={formData.album} onChange={handleChange} placeholder="Álbum" className="border p-2 rounded" required />
        <input name="releaseYear" value={formData.releaseYear} onChange={handleChange} type="number" placeholder="Ano de Lançamento" className="border p-2 rounded" required />
        <input name="releaseDate" value={formData.releaseDate} onChange={handleChange} type="date" placeholder="Data de Lançamento" className="border p-2 rounded" />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Gênero (separado por vírgula)" className="border p-2 rounded" />
        <input name="featuredArtists" value={formData.featuredArtists} onChange={handleChange} placeholder="Artistas em Destaque" className="border p-2 rounded" />
        <label className="flex items-center gap-2">
          <input name="isExplicit" type="checkbox" checked={formData.isExplicit} onChange={handleChange} />
          Conteúdo Explícito
        </label>
        <input name="duration" value={formData.duration} onChange={handleChange} type="number" placeholder="Duração (minutos)" className="border p-2 rounded" />
        <input name="rating" value={formData.rating} onChange={handleChange} type="number" placeholder="Avaliação (0-5)" className="border p-2 rounded" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Preço" className="border p-2 rounded" />
        <input name="audioQuality" value={formData.audioQuality} onChange={handleChange} placeholder="Qualidade de Áudio" className="border p-2 rounded" />
        <textarea name="lyrics" value={formData.lyrics} onChange={handleChange} placeholder="Letra da Música" className="border p-2 rounded h-32"></textarea>
        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (separadas por vírgula)" className="border p-2 rounded" />
        
  <strong>Metadados:</strong>
  {Object.entries(formData.metadata).map(([key, value], index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
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
        className="border p-2 rounded w-1/3"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => handleMetadataChange(key, e.target.value)}
        placeholder="Valor"
        className="border p-2 rounded w-2/3"
      />
      <button
        type="button"
        onClick={() => handleRemoveMetadata(key)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        ✕
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddMetadata}
    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
  >
    + Adicionar Metadado
  </button>
        <label className="flex flex-col">
          Capa do Álbum:
          <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
        </label>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditMusicPage;
