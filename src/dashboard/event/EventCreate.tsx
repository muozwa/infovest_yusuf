import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [speakers, setSpeakers] = useState<{ id: number; nama: string; role: string }[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    pembicaraId: "",
    tanggal: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, spkRes] = await Promise.all([
          fetch("http://localhost:3000/api/categories"),
          fetch("http://localhost:3000/api/pembicara"),
        ]);
        if (catRes.ok) setCategories(await catRes.json());
        if (spkRes.ok) setSpeakers(await spkRes.json());
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Validasi sederhana
    if (!formData.name || !formData.categoryId || !formData.pembicaraId || !formData.tanggal) {
      setErrorMsg("Semua field wajib diisi");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          categoryId: parseInt(formData.categoryId),
          pembicaraId: parseInt(formData.pembicaraId),
          tanggal: formData.tanggal,
          description: formData.description,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Gagal menambahkan event");
      }
      navigate("/dashboard/event");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingData) return <div className="p-6">Loading data kategori & pembicara...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-3 mb-5">
        New Event
      </h2>
      <form
        onSubmit={onSubmit}
        className="border border-amber-200 rounded-xl shadow-sm bg-white p-6 flex flex-col gap-4 max-w-md"
      >
        {/* Nama Event */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">Nama Event</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">Kategori</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Pembicara */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">Pembicara</label>
          <select
            name="pembicaraId"
            value={formData.pembicaraId}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          >
            <option value="">-- Pilih Pembicara --</option>
            {speakers.map((spk) => (
              <option key={spk.id} value={spk.id}>{spk.nama} - {spk.role}</option>
            ))}
          </select>
        </div>

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">Tanggal Event</label>
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">Deskripsi Event</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
            placeholder="Masukkan deskripsi event..."
          ></textarea>
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