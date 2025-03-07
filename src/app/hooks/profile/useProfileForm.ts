import { useState } from "react";
import { createProfile } from "@/app/lib/profile/profileApi";
import { useRouter } from "next/navigation"; 
const useProfileForm = () => {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    dateOfBirth: "",
    profilePictureUrl: "", 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileData = {
        displayName: formData.displayName,
        bio: formData.bio || null,
        location: formData.location || null,
        website: formData.website || null,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
        profilePictureUrl: formData.profilePictureUrl || null, 
      };

      await createProfile(profileData);
      alert("Perfil criado com sucesso!");

   
      router.push("/users/login"); 

    
      setFormData({
        displayName: "",
        bio: "",
        location: "",
        website: "",
        dateOfBirth: "",
        profilePictureUrl: "",
      });
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      alert("Erro ao criar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useProfileForm;

/**import { useState } from "react";
import { createProfile } from "@/app/lib/profile/profileApi";
import { useRouter } from "next/navigation"; // Importa o router

const useProfileForm = () => {
  const router = useRouter(); // Instância do router

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    dateOfBirth: "",
    profilePictureUrl: "", // Agora é um link, não um arquivo
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProfile(formData);
      alert("Perfil criado com sucesso!");

      // Redireciona para o Dashboard
      router.push("/dashboard"); 

    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      alert("Erro ao criar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useProfileForm;**/

