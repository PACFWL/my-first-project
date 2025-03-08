import ProfileForm from "@/app/components/profile/add/ProfileForm";

export default function CreateProfilePage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Criar Perfil</h1>
      <ProfileForm />
    </div>
  );
}