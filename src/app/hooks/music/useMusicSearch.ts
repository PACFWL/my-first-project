import { useState, useEffect } from "react";
import { advancedSearchMusic } from "@/app/lib/music/musicApi";

interface SearchParams {
  title?: string;
  artist?: string;
  album?: string;
  genres?: string[];
  releaseYear?: number;
  minRating?: number;
  afterYear?: number;
  isExplicit?: boolean;
  noLyrics?: boolean;
  featuringArtist?: string;
  maxPrice?: number;
  hasAlbumCover?: boolean;
  audioQuality?: string;
  createdAfter?: string;
  tags?: string[];
  metadata?: Record<string, string>;
  lyricsKeywords?: string;
  exactLyricsMatch?: boolean;
}

export function useMusicSearch(initialParams: SearchParams = {}) {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialParams);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      fetchMusic();
    }
  }, [searchParams]);

  const fetchMusic = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await advancedSearchMusic(searchParams);
      setResults(data);
    } catch (err) {
      setError("Erro ao buscar músicas. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { searchParams, setSearchParams, results, loading, error };
}