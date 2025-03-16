import MusicSearch from "@/app/components/music/search/MusicSearch"; 

export default function MusicSearchList() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pesquisa de Músicas</h1>
      <MusicSearch />
    </div>
  );
}
