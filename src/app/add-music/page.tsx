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
    metadata: "",
  });
  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement; // Faz um cast seguro
  
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value, 
    }));
  };
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAlbumCover(e.target.files[0]);
    }
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
      metadata: formData.metadata
        ? Object.fromEntries(
            formData.metadata.split(",").map((m) => m.split(":").map((v) => v.trim()))
          )
        : {},
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
        <input type="date" name="releaseDate" placeholder="Data de Lançamento" value={formData.releaseDate} onChange={handleChange} className="w-full p-2 border rounded" />
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
  <select
    name="audioQuality"
    value={formData.audioQuality}
    onChange={handleChange}
    className="w-full p-2 border rounded"
  >
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
        <input type="text" name="metadata" placeholder="Metadados (ex: chave:valor, chave2:valor2)" value={formData.metadata} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

        <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded w-full">
          {loading ? "Salvando..." : "Adicionar Música"}
        </button>
      </form>
    </div>
  );
}
