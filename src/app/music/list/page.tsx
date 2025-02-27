import MusicList from "@/app/components/list/MusicList"; 

export default function MusicListPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Listagem de Músicas</h1>
      <MusicList />
    </div>
  );
}
