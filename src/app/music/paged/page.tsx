"use client";

import { useEffect, useState } from "react";
import { getPagedMusic } from "@/app/lib/musicApi";

const PagedMusicList = () => {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; 

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await getPagedMusic(page, pageSize);
        setMusicList(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Erro ao buscar músicas paginadas:", error);
      }
    };

    fetchMusic();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Músicas Paginadas</h1>

      <ul>
        {musicList.map((music) => (
          <li key={music.id} className="border-b py-2">
            {music.title} - {music.artist}
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span>Página {page + 1} de {totalPages}</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default PagedMusicList;
