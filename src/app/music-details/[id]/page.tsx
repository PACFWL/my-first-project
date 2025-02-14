"use client"; // 🔥 Importante para evitar o erro de acesso síncrono aos params

import MusicDetails from "@/app/components/MusicDetails";
import { useParams } from "next/navigation";

export default function MusicDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <p className="text-red-500">ID da música não encontrado!</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Detalhes da Música</h1>
      <MusicDetails id={id} />
    </div>
  );
}
