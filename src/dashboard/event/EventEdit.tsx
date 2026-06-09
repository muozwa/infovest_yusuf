import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [categories, setCategories] = useState<
    { id: number; name: string }[]
  >([]);

  const [speakers, setSpeakers] = useState<
    { id: number; name: string; role: string }[]
  >([]);

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
        const [eventRes, categoryRes, speakerRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/events/${id}`),
          fetch(`${import.meta.env.VITE_API_URL}/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/pembicara`),
        ]);

        if (!eventRes.ok) {
          throw new Error("Event tidak ditemukan");
        }

        const eventData = await eventRes.json();

        setFormData({
          name: eventData.name || "",
          categoryId: eventData.categoryId?.toString() || "",
          pembicaraId: eventData.pembicaraId?.toString() || "",
          tanggal: eventData.tanggal
            ? eventData.tanggal.split("T")[0]
            : "",
          description: eventData.description || "",
        });

        if (categoryRes.ok) {
          setCategories(await categoryRes.json());
        }

        if (speakerRes.ok) {
          setSpeakers(await speakerRes.json());
        }
      } catch (error: any) {
        setErrorMsg(error.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            categoryId: Number(formData.categoryId),
            pembicaraId: Number(formData.pembicaraId),
            tanggal: formData.tanggal,
            description: formData.description,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Gagal mengupdate event"
        );
      }

      alert("Event berhasil diperbarui");
      navigate("/dashboard/event");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="p-6">
        Loading data event...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-3 mb-5">
        Edit Event
      </h2>

      <form
        onSubmit={handleSubmit}
        className="border border-amber-200 rounded-xl shadow-sm bg-white p-6 flex flex-col gap-4 max-w-md"
      >
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">
            Nama Event
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">
            Kategori
          </label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          >
            <option value="">-- Pilih Kategori --</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">
            Pembicara
          </label>

          <select
            name="pembicaraId"
            value={formData.pembicaraId}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          >
            <option value="">-- Pilih Pembicara --</option>

            {speakers.map((speaker) => (
              <option
                key={speaker.id}
                value={speaker.id}
              >
                {speaker.name} - {speaker.role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">
            Tanggal Event
          </label>

          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-1">
            Deskripsi
          </label>

          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-amber-200 rounded-md px-3 py-2"
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-amber-100 text-amber-800 font-medium px-5 py-2 rounded-md border border-amber-300 shadow-sm hover:bg-amber-200 transition-all disabled:opacity-50"
        >
          {isLoading ? "Menyimpan..." : "Update Event"}
        </button>
      </form>
    </div>
  );
}