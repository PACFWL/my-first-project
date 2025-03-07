"use client";
import { useEffect, useState } from "react";
import { getProfileByUserId } from "@/app/lib/profile/profileApi";

const useProfileDetails = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const storedUserId = sessionStorage.getItem("userId");

        if (!storedUserId) {
          throw new Error("Usuário não encontrado.");
        }

        const profileData = await getProfileByUserId(storedUserId);
        setProfile(profileData);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

export default useProfileDetails;
