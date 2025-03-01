import { useEffect, useState } from "react";
import { getMusicById } from "@/app/lib/music/musicApi";

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

const useMusicDetails = (id: string) => {
  const [music, setMusic] = useState<Music | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchMusicDetails(id);
    }
  }, [id]);

  const fetchMusicDetails = async (musicId: string) => {
    setLoading(true);
    try {
      const data = await getMusicById(musicId);
      console.log("Música carregada:", data); 
      setMusic(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da música:", error);
    }
    setLoading(false);
  };

  return { music, loading };
};

export default useMusicDetails;
