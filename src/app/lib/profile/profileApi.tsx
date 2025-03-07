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

    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || `Erro ${response.status}`);

    return data;
    //return response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

export const createProfile = async (profile: any) => {
  return fetchRequest(`${API_URL}/api/profiles`, {
    method: "POST",
    body: JSON.stringify(profile),
  });
};

export const getProfileById = async (id: string) => {
  return fetchRequest(`${API_URL}/api/profiles/${id}`, {
    method: "GET",
  });
};

export const getProfileByUserId = async (userId: string) => {
  return fetchRequest(`${API_URL}/api/profiles/user/${userId}`, {
    method: "GET",
  });
};

export const getAllActiveProfiles = async () => {
  return fetchRequest(`${API_URL}/api/profiles`, {
    method: "GET",
  });
};

export const updateProfile = async (id: string, profile: any) => {
  return fetchRequest(`${API_URL}/api/profiles/${id}`, {
    method: "PUT",
    body: JSON.stringify(profile),
  });
};

export const deleteProfile = async (id: string) => {
  return fetchRequest(`${API_URL}/api/profiles/${id}`, {
    method: "DELETE",
  });
};
