import { useForm } from "react-hook-form";
import InputText from "../../components/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../components/ui/Button";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetch(`${API_URL}/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setValue("name", data.name);
        setValue("email", data.email);
      });
  }, [id]);

  const handleEditUser = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      if (!res.ok) throw new Error();
      alert("User berhasil diupdate!");
      navigate("/dashboard/user");
    } catch {
      alert("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit(handleEditUser)}>
        <InputText label="Nama" nama="name" register={register} error={errors.name?.message} />
        <InputText label="Email" nama="email" type="email" register={register} error={errors.email?.message} />
        <InputText label="Password Baru" nama="password" type="password" register={register} error={errors.password?.message} />
        <Button tittle={loading ? "Menyimpan..." : "Update"} variant="primary" type="submit" />
      </form>
    </div>
  );
}