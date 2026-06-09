interface InputTextProps {
    label: string;
    nama: string;
    register: any;
    error?: string;
    type?: string;
}

const InputText: React.FC<InputTextProps> = ({ label, nama, register, error, type = "text" }) => {
    return (
        <div className="flex flex-col gap-3 mb-3">
            <label htmlFor={label}>{label}</label>
            <input 
                type={type}
                {...register(nama)} 
                placeholder={label} 
                className={`border p-2 rounded-xl outline-none
                ${error 
                    ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-300" 
                    : "border-gray-200 focus:ring-2 focus:ring-blue-300"
                }`}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
};

export default InputText;