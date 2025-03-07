"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import useProfileForm from "@/app/hooks/profile/useProfileForm";

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
    <form onSubmit={handleSubmit} className="profile-form">
      <input type="hidden" name="userId" value={formData.userId} />

      <div>
        <label>Nome de exibição:</label>
        <input 
          type="text" 
          name="displayName" 
          value={formData.displayName} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Biografia:</label>
        <textarea 
          name="bio" 
          value={formData.bio} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Localização:</label>
        <input 
          type="text" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Website:</label>
        <input 
          type="url" 
          name="website" 
          value={formData.website} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Data de Nascimento:</label>
        <input 
          type="date" 
          name="dateOfBirth" 
          value={formData.dateOfBirth} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>URL da Foto de Perfil:</label>
        <input 
          type="url" 
          name="profilePictureUrl" 
          value={formData.profilePictureUrl} 
          onChange={handleChange} 
        />
        {formData.profilePictureUrl && <img src={formData.profilePictureUrl} alt="Preview" className="preview-image" />}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Criar Perfil"}
      </button>
    </form>
  );
};

export default ProfileForm;
