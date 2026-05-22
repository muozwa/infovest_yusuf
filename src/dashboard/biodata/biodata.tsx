import { useNavigate } from "react-router-dom";

export default function Biodata() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 border-b border-amber-200 pb-3 mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-amber-600 hover:text-amber-800 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-xl font-semibold text-amber-800">Biodata Mahasiswa</h2>
      </div>
      <div className="border border-amber-200 rounded-xl shadow-sm bg-white p-6 max-w-md flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-amber-500 font-medium uppercase tracking-wide">Nama</span>
          <span className="text-amber-900 font-semibold"> YUSUF</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-amber-500 font-medium uppercase tracking-wide">NIM</span>
          <span className="text-amber-900 font-semibold">24090067</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-amber-500 font-medium uppercase tracking-wide">Prodi</span>
          <span className="text-amber-900 font-semibold">D4 Teknik Informatika</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-amber-500 font-medium uppercase tracking-wide">Universitas</span>
          <span className="text-amber-900 font-semibold">Universitas Harkat Negeri</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-amber-500 font-medium uppercase tracking-wide">Email</span>
          <span className="text-amber-900 font-semibold">yusuf281225@gmail.com</span>
        </div>
      </div>
    </div>
  );
}