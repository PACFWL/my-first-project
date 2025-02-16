"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createMusic } from "@/app/lib/musicApi";

export default function AddMusicPage() {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleMetadataChange = (oldKey: string, newKey: string, newValue: string) => {
    setFormData((prev) => {
      const newMetadata = { ...prev.metadata };
  
  
      if (oldKey !== newKey) {
        delete newMetadata[oldKey];
      }
  
     
      newMetadata[newKey] = newValue;
  
      return { ...prev, metadata: newMetadata };
    });
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
    setLoading(true);

    const newMusic = {
      ...formData,
      releaseYear: parseInt(formData.releaseYear),
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      price: formData.price || undefined,
      genre: formData.genre.split(",").map((g) => g.trim()),
      featuredArtists: formData.featuredArtists.split(",").map((a) => a.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
      metadata: formData.metadata,
    };

    try {
      await createMusic(newMusic, albumCover || undefined);
      alert("Música adicionada com sucesso!");
      router.push("/music-list");
    } catch (error) {
      console.error("Erro ao adicionar música:", error);
      alert("Erro ao adicionar música. Verifique os dados e tente novamente.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Adicionar Nova Música</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="artist" placeholder="Artista" value={formData.artist} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="album" placeholder="Álbum" value={formData.album} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="releaseYear" placeholder="Ano de Lançamento" value={formData.releaseYear} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="genre" placeholder="Gênero (separado por vírgulas)" value={formData.genre} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="featuredArtists" placeholder="Artistas em Destaque (separado por vírgulas)" value={formData.featuredArtists} onChange={handleChange} className="w-full p-2 border rounded" />
        <div className="flex items-center">
          <input type="checkbox" name="isExplicit" checked={formData.isExplicit} onChange={handleChange} className="mr-2" />
          <label>Conteúdo Explícito</label>
        </div>

        <input type="number" name="duration" placeholder="Duração (minutos)" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" step="0.1" name="rating" placeholder="Avaliação (0-5)" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="price" placeholder="Preço (R$)" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="block">
          Qualidade de Áudio:
          <select name="audioQuality" value={formData.audioQuality} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Selecione a Qualidade</option>
            <option value="UNKNOWN">Desconhecido</option>
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
            <option value="LOSSLESS">Sem Perdas (Lossless)</option>
          </select>
        </label>

        <textarea name="lyrics" placeholder="Letra da Música" value={formData.lyrics} onChange={handleChange} className="w-full p-2 border rounded h-32" />
        <input type="text" name="tags" placeholder="Tags (separado por vírgulas)" value={formData.tags} onChange={handleChange} className="w-full p-2 border rounded" />
        <strong>Metadados:</strong>
        {Object.entries(formData.metadata).map(([key, value], index) => (
  <div key={index} className="flex items-center gap-2 mb-2">
    <input
      type="text"
      value={key}
      onChange={(e) => handleMetadataChange(key, e.target.value, value)}
      placeholder="Chave"
      className="border p-2 rounded w-1/3"
    />
    <input
      type="text"
      value={value}
      onChange={(e) => handleMetadataChange(key, key, e.target.value)}
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
 <button type="button" onClick={handleAddMetadata} className="bg-green-500 text-white px-4 py-2 rounded mt-2">+ Adicionar Metadado</button>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded w-full">{loading ? "Salvando..." : "Adicionar Música"}</button>
      </form>
    </div>
  );
}
