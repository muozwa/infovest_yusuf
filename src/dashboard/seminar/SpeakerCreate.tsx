import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputText from "../../components/ui/InputText";

type FormData = {
    name: string;
    role: string;
}
const schema = z.object({
    name: z.string().min(1, "Name must be filled"),
    role: z.string().min(1, "Role must be filled"),
});

export default function SpeakerCreate() {
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/pembicara`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: data.name, role: data.role }),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Gagal menambahkan pembicara");
            }
            reset();
            navigate("/dashboard/seminar"); // atau "/dashboard/speaker" sesuai route kamu
        } catch (error: any) {
            setErrorMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-3 mb-5">
                New Speaker
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-amber-200 rounded-xl shadow-sm bg-white p-6 flex flex-col gap-4 max-w-md"
            >
                <InputText
                    label="Nama Speaker"
                    nama="nama"
                    register={register}
                    error={errors.name?.message}
                />
                <InputText
                    label="Role"
                    nama="role"
                    register={register}
                    error={errors.role?.message}
                />
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