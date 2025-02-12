import React from "react";
import { deleteMusic } from "@/app/lib/musicApi";

interface MusicItemProps {
  music: {
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
    price?: string;
    albumCoverImage?: string;
    audioQuality?: string;
    lyrics: string;
    tags?: string[];
    metadata?: Record<string, string>;
  };
  onDelete: (id: string) => void;
}

const MusicItem: React.FC<MusicItemProps> = ({ music, onDelete }) => {
  const handleDelete = async () => {
    console.log("Tentando excluir música com ID:", music.id);

    if (!music.id) {
      console.error("Erro: ID da música é inválido.");
      return;
    }

    if (window.confirm(`Deseja realmente excluir a música "${music.title}"?`)) {
      try {
        await deleteMusic(music.id);
        onDelete(music.id);
      } catch (error) {
        console.error("Erro ao excluir música:", error);
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col gap-2">
 {music.albumCoverImage && (
  <img 
    src={`data:image/jpeg;base64,${music.albumCoverImage}`} 
    alt={music.title} 
    className="w-32 h-32 rounded" 
  />
)}
      <div>
        <h3 className="font-bold text-lg">{music.title}</h3>
        <p className="text-sm text-gray-600">{music.artist} - {music.album} ({music.releaseYear})</p>
        {music.releaseDate && <p><strong>Data de Lançamento:</strong> {music.releaseDate}</p>}
        {music.genre && <p><strong>Gênero:</strong> {music.genre.join(", ")}</p>}
        {music.featuredArtists && music.featuredArtists.length > 0 && (
          <p><strong>Artistas em Destaque:</strong> {music.featuredArtists.join(", ")}</p>
        )}
        {music.isExplicit !== undefined && (
          <p><strong>Conteúdo Explícito:</strong> {music.isExplicit ? "Sim" : "Não"}</p>
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
        <p><strong>Letra:</strong> {music.lyrics}</p>
      </div>
      <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded mt-2">
        Excluir
      </button>
    </div>
  );
};

export default MusicItem;
