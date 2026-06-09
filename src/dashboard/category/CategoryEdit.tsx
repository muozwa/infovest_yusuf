import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setName(data.name);
      } catch (error: any) {
        setErrorMsg(error.message);
      }
    };
    fetchCategory();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return setErrorMsg("Nama kategori wajib diisi");
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Gagal mengupdate kategori");
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
        Edit Category
      </h2>
      <form
        onSubmit={onSubmit}
        className="border border-amber-200 rounded-xl shadow-sm bg-white p-6 flex flex-col gap-4 max-w-md"
      >
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">Nama Category</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-amber-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-100 text-amber-800 font-medium px-5 py-2 rounded-md border border-amber-300 shadow-sm hover:bg-amber-200 transition-all disabled:opacity-50"
          >
            {isLoading ? "Menyimpan..." : "Update"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/category")}
            className="bg-white text-amber-700 font-medium px-5 py-2 rounded-md border border-amber-200 hover:bg-amber-50 transition-all"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}