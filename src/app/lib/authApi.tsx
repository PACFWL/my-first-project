console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("A variável de ambiente NEXT_PUBLIC_API_URL não está definida.");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Erro na requisição.");
    return response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetchRequest(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return response.token; 
};

export const registerUser = async (user: { name: string; email: string; password: string; role: string }) => {
  return fetchRequest(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};
