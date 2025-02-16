"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Músicas</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/music-list")} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Listagem de Músicas
        </button>
        <button
          onClick={() => router.push("/add-music")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Adicionar Nova Música
        </button>
      </div>
    </div>
  );
}
