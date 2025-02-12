"use client"; 

import React, { useEffect } from "react";
import MusicList from "@/app/components/MusicList";
import MusicForm from "@/app/components/MusicForm";
import { useMusic } from "@/app/context/MusicContext";

const MusicPage: React.FC = () => {
  const { fetchMusic, musicList } = useMusic();

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gerenciar Músicas</h1>
      <MusicForm onSuccess={fetchMusic} />
      <MusicList />
    </div>
  );
};

export default MusicPage;
