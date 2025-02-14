"use client"; 

import React, { useEffect, useState } from "react";
import { getAllMusic } from "@/app/lib/musicApi";
import MusicItem from "./MusicItem";

const MusicList: React.FC = () => {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    setLoading(true);
    try {
      const data = await getAllMusic();
      console.log("Músicas carregadas da API:", data); 
      setMusicList(data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
    setLoading(false);
  };  

  const handleDelete = (id: string) => {
    setMusicList(musicList.filter((music) => music.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Músicas</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : musicList.length > 0 ? (
        <div className="grid gap-4">
        {musicList.map((music) => {
  console.log("Renderizando música:", music); 
  return <MusicItem key={music.id} music={music} onDelete={handleDelete} />;
})}
        </div>
      ) : (
        <p>Nenhuma música encontrada.</p>
      )}
    </div>
  );
};

export default MusicList;
