import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";
import { z } from "zod";

type FormData = {
  nama: string;
};
const schema = z.object({
  nama: z.string().min(1, "Nama Category harus diisi"),
});

export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-3 mb-5">
        New Category
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-amber-200 rounded-xl shadow-sm bg-white p-6 flex flex-col gap-4 max-w-md"
      >
        <InputText
          label="New Category"
          nama="nama"
          register={register}
          error={errors.nama?.message}
        />
        <Button
          label="Add"
          variant="primary"
          className="bg-amber-100 text-amber-800 font-medium px-5 py-2 rounded-md border border-amber-300 shadow-sm hover:bg-amber-200 transition-all"
        />
      </form>
    </div>
  );
}