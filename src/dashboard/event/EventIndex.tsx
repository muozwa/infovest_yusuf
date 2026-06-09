import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Event = {
  id: number;
  name: string;
  tanggal: string;
  description: string;
  category?: {
    name: string;
  };
  pembicara?: {
    name: string;
  };
};

export default function EventIndex() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);

      if (!res.ok) {
        throw new Error("Gagal mengambil data event");
      }

      const data = await res.json();
      setEvents(data);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus event ini?")) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`, {
        method: "DELETE",
      });

      setEvents(events.filter((event) => event.id !== id));
    } catch {
      alert("Gagal menghapus event");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-6">
        <h1 className="text-xl font-semibold text-amber-800">
          Event
        </h1>

        <Link
          to="/dashboard/event/new"
          className="bg-amber-100 text-amber-800 font-medium text-sm px-4 py-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-200 hover:shadow transition-all"
        >
          + Add New Event
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      {errorMsg && (
        <p className="text-red-500">{errorMsg}</p>
      )}

      {!loading && events.length === 0 && (
        <p>Belum ada event.</p>
      )}

      {!loading && events.length > 0 && (
        <table className="w-full text-sm border border-amber-200 rounded-xl overflow-hidden">
          <thead className="bg-amber-50 text-amber-800">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Nama Event</th>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-left">Pembicara</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className="hover:bg-amber-50">
                <td className="px-4 py-2 border-b">
                  {index + 1}
                </td>

                <td className="px-4 py-2 border-b">
                  {event.name}
                </td>

                <td className="px-4 py-2 border-b">
                  {event.category?.name ?? "-"}
                </td>

                <td className="px-4 py-2 border-b">
                  {event.pembicara?.name ?? "-"}
                </td>

                <td className="px-4 py-2 border-b">
                  {new Date(event.tanggal).toLocaleDateString("id-ID")}
                </td>

                <td className="px-4 py-2 border-b flex gap-2">
                  <Link
                    to={`/dashboard/event/edit/${event.id}`}
                    className="text-amber-700 hover:underline text-xs"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(event.id)}
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