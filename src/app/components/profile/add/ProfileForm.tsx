"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import useProfileForm from "@/app/hooks/profile/useProfileForm";
import styles from "../../../styles/profile/ProfileForm.module.css";

const ProfileForm: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); 

  const { formData, setFormData, handleChange, handleSubmit, loading } = useProfileForm();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prev) => ({ ...prev, userId: storedUserId }));
    }
  }, [setFormData]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <input type="hidden" name="userId" value={formData.userId} />

        <div>
          <label className={styles.label}>Nome de exibição:</label>
          <input 
            type="text" 
            name="displayName" 
            value={formData.displayName} 
            onChange={handleChange} 
            required 
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Biografia:</label>
          <textarea 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange} 
            className={styles.textarea}
          />
        </div>

        <div>
          <label className={styles.label}>Localização:</label>
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Website:</label>
          <input 
            type="url" 
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Data de Nascimento:</label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={formData.dateOfBirth} 
            onChange={handleChange} 
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>URL da Foto de Perfil:</label>
          <input 
            type="url" 
            name="profilePictureUrl" 
            value={formData.profilePictureUrl} 
            onChange={handleChange} 
            className={styles.input}
          />
          {formData.profilePictureUrl && (
            <img src={formData.profilePictureUrl} alt="Preview" className={styles.previewImage} />
          )}
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Salvando..." : "Criar Perfil"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
