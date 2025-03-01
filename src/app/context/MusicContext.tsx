"use client"; 

import React, { createContext, useState, useContext } from "react";
import { getAllMusic } from "@/app/lib/music/musicApi";

interface Music {
  id: string;
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
}

interface MusicContextProps {
  musicList: Music[];
  fetchMusic: () => void;
}

export const MusicContext = createContext<MusicContextProps | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [musicList, setMusicList] = useState<Music[]>([]);

  const fetchMusic = async () => {
    try {
      const data = await getAllMusic();
      setMusicList(data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  };

  return (
    <MusicContext.Provider value={{ musicList, fetchMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextProps => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic deve ser usado dentro de MusicProvider");
  }
  return context;
};
