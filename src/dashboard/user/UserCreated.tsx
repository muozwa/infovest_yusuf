import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";
import { API_URL } from "../../config/api";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function UserCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleCreateUser = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Gagal menyimpan user");
      alert("User berhasil ditambahkan!");
      navigate("/dashboard/user");
    } catch (error) {
      alert("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah User</h1>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <InputText
          label="Nama"
          nama="name"
          register={register}
          error={errors.name?.message}
        />
        <InputText
          label="Email"
          nama="email"
          type="email" 
          register={register}
          error={errors.email?.message}
        />
        <InputText
          label="Password"
          nama="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <Button
          tittle={loading ? "Menyimpan..." : "Simpan"}
          variant="primary"
          type="submit"
        />
      </form>
    </div>
  );
}