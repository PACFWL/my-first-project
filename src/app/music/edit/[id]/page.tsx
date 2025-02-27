
"use client";

import EditMusicForm from "@/app/components/edit/MusicFormEdit";

export default function EditMusicPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Editar Música</h1>
      <EditMusicForm />
    </div>
  );
}
