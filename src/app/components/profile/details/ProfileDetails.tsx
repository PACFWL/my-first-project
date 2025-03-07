"use client";
import React from "react";
import useProfileDetails from "@/app/hooks/profile/useProfileDetails";
import styles from "../../../styles/profile/ProfileDetails.module.css";

const ProfileDetails: React.FC = () => {
  const { profile, loading, error } = useProfileDetails();

  if (loading) return <p>Carregando perfil...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className={styles.container}>
      {profile.profilePictureUrl && (
        <img
          src={profile.profilePictureUrl}
          alt="Foto de perfil"
          className={styles.profileImage}
        />
      )}

      <h2 className={styles.title}>{profile.displayName}</h2>

      <p className={styles.info}><strong>Biografia:</strong> {profile.bio || "Não informada"}</p>
      <p className={styles.info}><strong>Localização:</strong> {profile.location || "Não informada"}</p>
      
      <p className={styles.info}>
        <strong>Website:</strong> 
        {profile.website ? (
          <a href={profile.website} target="_blank" className={styles.link}>{profile.website}</a>
        ) : (
          "Não informado"
        )}
      </p>

      <p className={styles.info}><strong>Data de Nascimento:</strong> {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "Não informada"}</p>
    </div>
  );
};

export default ProfileDetails;
