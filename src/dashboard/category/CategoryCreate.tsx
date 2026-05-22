import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";

type FormData = {
  nama: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama Category harus diisi"),
});

export default function CategoryCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.nama }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Gagal menambahkan kategori");
      }
      await response.json();
      reset();
      navigate("/dashboard/category");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-3 mb-5">
        New Category
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-amber-200 rounded-xl shadow-sm bg-white p-6 flex flex-col gap-4 max-w-md"
      >
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">
            Nama Category
          </label>
          <input
            type="text"
            {...register("nama")}
            className="w-full border border-amber-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400"
            placeholder="Masukkan nama kategori"
          />
          {errors.nama && (
            <p className="text-red-500 text-sm mt-1">{errors.nama.message}</p>
          )}
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-amber-100 text-amber-800 font-medium px-5 py-2 rounded-md border border-amber-300 shadow-sm hover:bg-amber-200 transition-all disabled:opacity-50"
        >
          {isLoading ? "Menyimpan..." : "Add"}
        </button>
      </form>
    </div>
  );
}