"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllMusic } from "@/app/lib/musicApi";

const MusicList: React.FC = () => {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    setLoading(true);
    try {
      const data = await getAllMusic();
      setMusicList(data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Músicas</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : musicList.length > 0 ? (
        <div className="grid gap-4">
          {musicList.map((music) => (
            <div key={music.id} className="border p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{music.title}</h3>
                <p className="text-sm text-gray-600">{music.artist} - {music.album}</p>
              </div>
              <button
                onClick={() => router.push(`/music-details/${music.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Visualizar Dados
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma música encontrada.</p>
      )}
    </div>
  );
};

export default MusicList;
