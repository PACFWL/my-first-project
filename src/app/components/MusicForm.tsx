"use client";

import React, { useState } from "react";
import { createMusic, updateMusic } from "@/app/lib/musicApi";

interface MusicFormProps {
  existingMusic?: {
    id: string;
    title: string;
    artist: string;
    album: string;
    releaseYear: number;
    releaseDate?: string;
    genre?: string[];
    featuredArtists?: string[];
    isExplicit?: boolean;
    duration?: number;
    rating?: number;
    price?: number;
    audioQuality?: string;
    tags?: string[];
    metadata?: Record<string, string>;
  };
  onSuccess: () => void;
}

const MusicForm: React.FC<MusicFormProps> = ({ existingMusic, onSuccess }) => {
  const [music, setMusic] = useState(existingMusic || {
    title: "",
    artist: "",
    album: "",
    releaseYear: new Date().getFullYear(),
    releaseDate: "",
    genre: [] as string[],
    featuredArtists: [] as string[],
    isExplicit: false,
    duration: 0,
    rating: 0,
    price: 0,
    audioQuality: "MEDIUM",
    tags: [] as string[],
    metadata: {},
  });
  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setMusic({
      ...music,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMusic({ ...music, [e.target.name]: e.target.value.split(",").map(item => item.trim()) });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAlbumCover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (existingMusic) {
        await updateMusic(existingMusic.id, music, albumCover || undefined);
      } else {
        await createMusic(music, albumCover || undefined);
      }
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar música:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">{existingMusic ? "Editar Música" : "Adicionar Música"}</h2>
      <div className="grid gap-4">
        <input type="text" name="title" placeholder="Título" value={music.title} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="artist" placeholder="Artista" value={music.artist} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="album" placeholder="Álbum" value={music.album} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="releaseYear" placeholder="Ano de Lançamento" value={music.releaseYear} onChange={handleChange} className="border p-2 rounded" required />
        <input type="date" name="releaseDate" value={music.releaseDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="genre" placeholder="Gêneros (separados por vírgula)" value={(music.genre || []).join(",")} onChange={handleArrayChange} className="border p-2 rounded" />

<input type="text" name="featuredArtists" placeholder="Artistas em destaque (separados por vírgula)" value={(music.featuredArtists || []).join(",")} onChange={handleArrayChange} className="border p-2 rounded" />

<input type="text" name="tags" placeholder="Tags (separadas por vírgula)" value={(music.tags || []).join(",")} onChange={handleArrayChange} className="border p-2 rounded" />

               <label className="flex items-center gap-2">
          <input type="checkbox" name="isExplicit" checked={music.isExplicit} onChange={() => setMusic({...music, isExplicit: !music.isExplicit})} /> Conteúdo explícito
        </label>
        <input type="number" name="duration" placeholder="Duração (segundos)" value={music.duration} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="rating" placeholder="Avaliação (0-5)" step="0.1" value={music.rating} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="price" placeholder="Preço" step="0.01" value={music.price} onChange={handleChange} className="border p-2 rounded" />
        <select name="audioQuality" value={music.audioQuality} onChange={handleChange} className="border p-2 rounded">
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
          <option value="LOSSLESS">Sem perda</option>
        </select>
               <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {loading ? "Salvando..." : existingMusic ? "Atualizar Música" : "Adicionar Música"}
        </button>
      </div>
    </form>
  );
};

export default MusicForm;