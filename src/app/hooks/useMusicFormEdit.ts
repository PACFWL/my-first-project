import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMusicById, updateMusic } from "@/app/lib/musicApi";

const useMusicFormEdit = () => {
  const { id } = useParams();
  const musicId = Array.isArray(id) ? id[0] : id ?? "";
  const router = useRouter();

  const [music, setMusic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [albumCoverFile, setAlbumCoverFile] = useState<File | null>(null);
  const [removeAlbumCover, setRemoveAlbumCover] = useState(false);
  const [existingAlbumCover, setExistingAlbumCover] = useState<string | null>(null);
  const [initialAlbumCover, setInitialAlbumCover] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    releaseYear: "",
    releaseDate: "",
    genre: "",
    featuredArtists: "",
    isExplicit: false,
    duration: "",
    rating: "",
    price: "",
    audioQuality: "",
    lyrics: "",
    tags: "",
    metadata: {} as Record<string, string>,
  });

  useEffect(() => {
    if (musicId) {
      fetchMusicDetails(musicId);
    }
  }, [musicId]);

  const fetchMusicDetails = async (musicId: string) => {
    setLoading(true);
    try {
      const data = await getMusicById(musicId);
      setMusic(data);
      setFormData({
        title: data.title,
        artist: data.artist,
        album: data.album,
        releaseYear: data.releaseYear.toString(),
        releaseDate: data.releaseDate || "",
        genre: data.genre ? data.genre.join(", ") : "",
        featuredArtists: data.featuredArtists ? data.featuredArtists.join(", ") : "",
        isExplicit: data.explicit || false,
        duration: data.duration ? data.duration.toString() : "",
        rating: data.rating ? data.rating.toString() : "",
        price: data.price || "",
        audioQuality: data.audioQuality || "",
        lyrics: data.lyrics || "",
        tags: data.tags ? data.tags.join(", ") : "",
        metadata: data.metadata || {},
      });

      if (data.albumCoverImage) {
        const imageSrc = `data:image/jpeg;base64,${data.albumCoverImage}`;
        setExistingAlbumCover(imageSrc);
        setInitialAlbumCover(imageSrc);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da música:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAlbumCoverFile(e.target.files[0]);
      setExistingAlbumCover(null);
      setRemoveAlbumCover(false);
    }
  };

  const handleRemoveAlbumCover = () => {
    setAlbumCoverFile(null);
    setExistingAlbumCover(null);
    setRemoveAlbumCover(true);
  };

  const handleMetadataChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value },
    }));
  };
  
  const handleRemoveMetadata = (key: string) => {
    const newMetadata = { ...formData.metadata };
    delete newMetadata[key];
    setFormData((prev) => ({
      ...prev,
      metadata: newMetadata,
    }));
  };
  
  const handleAddMetadata = () => {
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, "": "" }, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalAlbumCover = null;
    if (albumCoverFile) {
      finalAlbumCover = albumCoverFile;
    } else if (!removeAlbumCover && initialAlbumCover) {
      finalAlbumCover = initialAlbumCover;
    }

    const updatedMusic = {
      ...formData,
      releaseYear: parseInt(formData.releaseYear),
      genre: formData.genre.split(",").map((g) => g.trim()),
      featuredArtists: formData.featuredArtists.split(",").map((a) => a.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
      metadata: formData.metadata,
      albumCover: finalAlbumCover,
    };

    console.log("🎵 Dados enviados:", updatedMusic);
    console.log("📷 Arquivo enviado:", albumCoverFile);

    try {
      await updateMusic(musicId, updatedMusic, albumCoverFile || undefined);
      alert("Música atualizada com sucesso!");
      router.push(`/music/details/${musicId}`);
    } catch (error) {
      console.error("Erro ao atualizar música:", error);
      alert("Erro ao atualizar música. Verifique os dados e tente novamente.");
    }
  };

  return {
    music,
    loading,
    formData,
    setFormData,
    fetchMusicDetails,
    handleChange,
    handleFileChange,
    handleSubmit,
    albumCoverFile,
    existingAlbumCover,
    removeAlbumCover,
    setRemoveAlbumCover,
    handleRemoveAlbumCover,
    handleMetadataChange,
    handleRemoveMetadata,
    handleAddMetadata
  };
};

export default useMusicFormEdit;
