import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayouts() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    alert("Logout berhasil!");
  };

  return (
    <div className="flex w-full">
      {/* Sidebar - warna coksu soft */}
      <div className="w-64 p-4 bg-amber-50 min-h-screen flex flex-col justify-between border-r border-amber-200 sticky top-0 self-start shadow-sm">
        <div>
          <div className="border-b border-amber-200 text-center p-3 mb-6">
            <h2 className="text-amber-800 text-xl font-semibold tracking-tight">InvoFest Dashboard</h2>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="text-amber-700 font-medium px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/category"
              className="text-amber-700 font-medium px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Category
            </Link>
            <Link
              to="/dashboard/event"
              className="text-amber-700 font-medium px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Event
            </Link>
            <Link
              to="/dashboard/seminar"
              className="text-amber-700 font-medium px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Seminar
            </Link>

            <Link
              to="/dashboard/biodata"
              className="text-amber-700 font-medium px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Biodata
            </Link>

          </div>
        </div>

        <div className="pt-4 border-t border-amber-200">
          <button
            onClick={handleLogout}
            className="bg-white text-amber-700 px-3 py-2 rounded-lg w-full font-medium border border-amber-200 hover:bg-amber-100 transition-colors"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content area - background soft cream */}
      <div className="w-full p-6 bg-stone-50">
        <Outlet />
      </div>
    </div>
  );
}