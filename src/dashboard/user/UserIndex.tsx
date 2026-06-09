import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
};

export default function userIndex() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin mau hapus user ini?")) return;
        await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white-200 pb-8 mb-8">
                <div>
                    <h2 className="text-xl font-semibold text-amber-800">Users</h2>
                    <p className="text-gray-500">Kelola pengguna di sini</p>
                </div>
                <Link
                    to="/dashboard/user/create"
                    className="bg-amber-100 text-amber-800 font-medium text-sm px-4 py-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-200 hover:shadow transition-all"
                >
                    + Add New User
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-400 text-center">Loading...</p>
            ) : users.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-20 text-center">
                    <p className="text-gray-300 italic font-medium">Belum ada data pengguna tersedia.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-amber-100 text-amber-800">
                            <tr>
                                <th className="px-6 py-4">No</th>
                                <th className="px-6 py-4">Nama User</th>
                                <th className="px-6 py-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <Link
                                            to={`/dashboard/user/edit/${user.id}`}
                                            className="bg-amber-100 text-amber-800 font-medium text-sm px-4 py-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-200 hover:shadow transition-all"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}