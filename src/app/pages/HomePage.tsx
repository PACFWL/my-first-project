"use client";

import { useState } from "react";
import MusicList from "@/app/components/MusicList";
import MusicForm from "@/app/components/MusicForm";

const HomePage: React.FC = () => {
  const [view, setView] = useState<"list" | "add">("list");

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gerenciamento de Músicas</h1>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setView("list")} 
          className={`p-2 rounded ${view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Listar Músicas
        </button>
        <button 
          onClick={() => setView("add")} 
          className={`p-2 rounded ${view === "add" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Adicionar Música
        </button>
      </div>

      {view === "list" ? <MusicList /> : <MusicForm onSuccess={() => setView("list")} />}
    </div>
  );
};

export default HomePage;
