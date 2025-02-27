import MusicForm from "@/app/components/add/MusicForm";

export default function AddMusicPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Adicionar Nova Música</h1>
      <MusicForm />
    </div>
  );
}
