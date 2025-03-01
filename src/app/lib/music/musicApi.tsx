console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("A variável de ambiente NEXT_PUBLIC_API_URL não está definida.");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

    return response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

export const getAllMusic = async () => fetchRequest(`${API_URL}/api/music`, { method: "GET" });

export const getMusicById = async (id: string) =>
  fetchRequest(`${API_URL}/api/music/${id}`, { method: "GET" });

export const deleteMusic = async (id: string) => {
  console.log(`Enviando requisição DELETE para: ${API_URL}/${id}`);
  return fetchRequest(`${API_URL}/api/music/${id}`, { method: "DELETE" });
};

export const createMusic = async (music: any, albumCover?: File) => {
  const formData = new FormData();
  formData.append("music", new Blob([JSON.stringify(music)], { type: "application/json" }));
  if (albumCover) formData.append("albumCoverImage", albumCover);

  return fetchRequest(`${API_URL}/api/music`, { method: "POST", body: formData });
};

export const updateMusic = async (id: string, music: any, albumCover?: File) => {
  const formData = new FormData();
  formData.append("music", new Blob([JSON.stringify(music)], { type: "application/json" }));
  if (albumCover) formData.append("albumCoverImage", albumCover);

  return fetchRequest(`${API_URL}/api/music/${id}`, { method: "PUT", body: formData });
};

export const searchMusic = async (params: Record<string, string | number | boolean>) => {
  const query = new URLSearchParams(params as any).toString();
  return fetchRequest(`${API_URL}/api/music/search?${query}`, { method: "GET" });
};

export const getPagedMusic = async (page: number = 0, size: number = 10) => {
  return fetchRequest(`${API_URL}/api/music/paged?page=${page}&size=${size}`, { method: "GET" });
};

export const getMusicByGenres = async (genres: string[]) => 
  fetchRequest(`${API_URL}/api/music/filter/by-genres?genres=${genres.join(",")}`, { method: "GET" });

export const getMusicByArtist = async (artist: string) => 
  fetchRequest(`${API_URL}/api/music/filter/by-artist?artist=${artist}`, { method: "GET" });

export const getMusicByRating = async (rating: number) => 
  fetchRequest(`${API_URL}/api/music/filter/by-rating?rating=${rating}`, { method: "GET" });

export const getMusicByPrice = async (maxPrice: number) => 
  fetchRequest(`${API_URL}/api/music/filter/by-price?maxPrice=${maxPrice}`, { method: "GET" });

export const getMusicByAudioQuality = async (audioQuality: string) => 
  fetchRequest(`${API_URL}/api/music/filter/by-audio-quality?audioQuality=${audioQuality}`, { method: "GET" });

export const getMusicByCreationDate = async (createdAfter: string) => 
  fetchRequest(`${API_URL}/api/music/filter/by-created-after?createdAfter=${createdAfter}`, { method: "GET" });
