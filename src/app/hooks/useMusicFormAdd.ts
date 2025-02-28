import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMusic } from "@/app/lib/musicApi";

const useMusicFormAdd = () => {
    const router = useRouter();
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
  
    const [albumCover, setAlbumCover] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setAlbumCover(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    };
  
    const handleMetadataChange = (oldKey: string, newKey: string, newValue: string) => {
      setFormData((prev) => {
        const newMetadata = { ...prev.metadata };
      
        if (oldKey !== newKey) {
          delete newMetadata[oldKey];
        }
       
        newMetadata[newKey] = newValue;
    
        return { ...prev, metadata: newMetadata };
      });
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
      setLoading(true);
  
      const newMusic = {
        ...formData,
        releaseYear: parseInt(formData.releaseYear),
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
        price: formData.price || undefined,
        genre: formData.genre.split(",").map((g) => g.trim()),
        featuredArtists: formData.featuredArtists.split(",").map((a) => a.trim()),
        tags: formData.tags.split(",").map((t) => t.trim()),
        metadata: formData.metadata,
      };
  
      try {
        await createMusic(newMusic, albumCover || undefined);
        alert("Música adicionada com sucesso!");
        router.push("/music/list");
      } catch (error) {
        console.error("Erro ao adicionar música:", error);
        alert("Erro ao adicionar música. Verifique os dados e tente novamente.");
      }
  
      setLoading(false);
    };

    return {
        formData,
        previewImage,
        loading,
        handleChange,
        handleFileChange,
        handleMetadataChange,
        handleRemoveMetadata,
        handleAddMetadata,
        handleSubmit
    };
};

export default useMusicFormAdd;