"use client";

import { useState } from "react";

const MusicUpload = () => {
  const [musicData, setMusicData] = useState({
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
    lyrics: "",
    price: "",
    audioQuality: "",
    tags: "",
    metadata: {}
  });

  const [albumCover, setAlbumCover] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMusicData((prev) => ({ ...prev,    [name]: ["genre", "featuredArtists", "tags"].includes(name)
        ? value.split(",").map((item) => item.trim()) 
        : name === "metadata" && value === ""
        ? {}  
        : value,}));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMusicData((prev) => ({ ...prev, isExplicit: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAlbumCover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
   
    const formData = new FormData();

   
    formData.append("music", new Blob([JSON.stringify(musicData)], { type: "application/json" }));

 
    if (albumCover) {
      formData.append("albumCoverImage", albumCover);
    }

    try {
      const response = await fetch("http://localhost:8080/api/music", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar música.");
      }

      const data = await response.json();
      console.log("Música enviada com sucesso:", data);
      alert("Música enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar música:", error);
      alert("Erro ao enviar música. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Music</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="artist" placeholder="Artist" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="album" placeholder="Album" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="releaseYear" placeholder="Release Year" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="releaseDate" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input
  type="text"
  name="genre"
  placeholder="Genres (comma separated)"
  onChange={handleChange}
  required
  className="w-full p-2 border rounded"
/>

<input
  type="text"
  name="featuredArtists"
  placeholder="Featured Artists (comma separated)"
  onChange={handleChange}
  className="w-full p-2 border rounded"
/>

<input
  type="text"
  name="tags"
  placeholder="Tags (comma separated)"
  onChange={handleChange}
  className="w-full p-2 border rounded"
/>

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isExplicit" checked={musicData.isExplicit} onChange={handleCheckboxChange} />
          <span>Explicit Content</span>
        </label>
        
        <input type="number" step="0.01" name="duration" placeholder="Duration (minutes)" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" step="0.1" name="rating" placeholder="Rating (1-5)" onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="lyrics" placeholder="Lyrics" onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        <input type="number" step="0.01" name="price" placeholder="Price" onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <select name="audioQuality" onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Audio Quality</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <input type="file" onChange={handleFileChange} required className="w-full p-2 border rounded" />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Upload</button>
      </form>
    </div>
  );
};

export default MusicUpload;
