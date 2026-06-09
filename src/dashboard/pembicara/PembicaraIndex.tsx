import { Link } from "react-router-dom";

export default function PembicaraIndex() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-6">
                <h1 className="text-xl font-semibold text-amber-800">Pembicara</h1>
                <Link
                    to="/dashboard/pembicara/create"
                    className="bg-amber-100 text-amber-800 font-medium text-sm px-4 py-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-200 hover:shadow transition-all"
                >
                    + Add New Pembicara
                </Link>
            </div>
        </div>
    );
}