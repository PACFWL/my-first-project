console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("A variável de ambiente NEXT_PUBLIC_API_URL não está definida.");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Erro ao acessar a API:", error);
    throw error;
  }
};


export const getAllMusic = async () => fetchRequest(API_URL, { method: "GET" });


export const getMusicById = async (id: string) =>
  fetchRequest(`${API_URL}/${id}`, { method: "GET" });


export const deleteMusic = async (id: string) => {
  console.log(`Enviando requisição DELETE para: ${API_URL}/${id}`);
  return fetchRequest(`${API_URL}/${id}`, { method: "DELETE" });
};


export const createMusic = async (music: any, albumCover?: File) => {
  const formData = new FormData();
  formData.append("music", new Blob([JSON.stringify(music)], { type: "application/json" }));
  if (albumCover) formData.append("albumCoverImage", albumCover);

  return fetchRequest(API_URL, { method: "POST", body: formData });
};


export const updateMusic = async (id: string, music: any, albumCover?: File) => {
  const formData = new FormData();
  formData.append("music", new Blob([JSON.stringify(music)], { type: "application/json" }));
  if (albumCover) formData.append("albumCoverImage", albumCover);

  return fetchRequest(`${API_URL}/${id}`, { method: "PUT", body: formData });
};


export const searchMusic = async (params: Record<string, string | number | boolean>) => {
  const query = new URLSearchParams(params as any).toString();
  return fetchRequest(`${API_URL}/search?${query}`, { method: "GET" });
};


export const getPagedMusic = async (page: number = 0, size: number = 10) => {
  return fetchRequest(`${API_URL}/paged?page=${page}&size=${size}`, { method: "GET" });
};
