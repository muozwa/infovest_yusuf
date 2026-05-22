import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      if (!res.ok) throw new Error("Gagal mengambil data");
      setCategories(await res.json());
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        method: "DELETE",
      });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch {
      alert("Gagal menghapus kategori");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-amber-800">Kategori Event</h2>
        <Link
          to="/dashboard/category/create"
          className="bg-amber-100 text-amber-800 font-medium text-sm px-4 py-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-200 hover:shadow transition-all"
        >
          + Add New Category
        </Link>
      </div>

      {loading && <p className="text-amber-700">Loading...</p>}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      {!loading && categories.length === 0 && (
        <p className="text-amber-600 text-sm">Belum ada kategori.</p>
      )}

      {!loading && categories.length > 0 && (
        <table className="w-full text-sm border border-amber-200 rounded-xl overflow-hidden">
          <thead className="bg-amber-50 text-amber-800">
            <tr>
              <th className="text-left px-4 py-2 border-b border-amber-200">No</th>
              <th className="text-left px-4 py-2 border-b border-amber-200">Nama Kategori</th>
              <th className="text-left px-4 py-2 border-b border-amber-200">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="hover:bg-amber-50">
                <td className="px-4 py-2 border-b border-amber-100">{index + 1}</td>
                <td className="px-4 py-2 border-b border-amber-100">{cat.name}</td>
                <td className="px-4 py-2 border-b border-amber-100 flex gap-2">
                  <Link
                    to={`/dashboard/category/edit/${cat.id}`}
                    className="text-amber-700 hover:underline text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}