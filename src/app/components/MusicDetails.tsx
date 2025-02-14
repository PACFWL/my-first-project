"use client";

import React, { useEffect, useState } from "react";
import { getMusicById, deleteMusic } from "@/app/lib/musicApi";
import { useRouter } from "next/navigation";

interface Music {
  id: string;
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  releaseDate?: string;
  genre?: string[];
  featuredArtists?: string[];
  explicit?: boolean;
  duration?: number;
  rating?: number;
  price?: string;
  albumCoverImage?: string;
  audioQuality?: string;
  lyrics: string;
  tags?: string[];
  metadata?: Record<string, string>;
}

const MusicDetails: React.FC<{ id: string }> = ({ id }) => {
  const [music, setMusic] = useState<Music | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchMusicDetails(id);
    }
  }, [id]);

  const fetchMusicDetails = async (musicId: string) => {
    setLoading(true);
    try {
      const data = await getMusicById(musicId);
      console.log("Música carregada:", data); // 🛠️ Verificar se isExplicit está vindo
      setMusic(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da música:", error);
    }
    setLoading(false);
  };
  

  const handleDelete = async () => {
    if (!music) return;

    if (window.confirm(`Deseja realmente excluir a música "${music.title}"?`)) {
      try {
        await deleteMusic(music.id);
        alert("Música excluída com sucesso!");
        router.push("/music-list"); 
      } catch (error) {
        console.error("Erro ao excluir música:", error);
      }
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (!music) return <p className="text-red-500">Música não encontrada!</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow bg-white">
      {music.albumCoverImage && (
        <img
          src={`data:image/jpeg;base64,${music.albumCoverImage}`}
          alt={music.title}
          className="w-64 h-64 mx-auto mb-4 rounded-lg"
        />
      )}
      <h2 className="text-3xl font-bold mb-2">{music.title}</h2>
      <p className="text-lg text-gray-600">{music.artist} - {music.album} ({music.releaseYear})</p>
      
      {music.releaseDate && <p><strong>Data de Lançamento:</strong> {music.releaseDate}</p>}
      {music.genre && <p><strong>Gênero:</strong> {music.genre.join(", ")}</p>}
      {music.featuredArtists && music.featuredArtists.length > 0 && (
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
      {music.metadata && (
        <div>
          <strong>Metadados:</strong>
          <ul className="list-disc ml-4">
            {Object.entries(music.metadata).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4"><strong>Letra:</strong></p>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{music.lyrics}</pre>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Excluir Música
      </button>
      <button
  onClick={() => router.push(`/edit-music/${music.id}`)}
  className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 w-full"
>
  Editar Música
</button>
    </div>
  );
};

export default MusicDetails;
