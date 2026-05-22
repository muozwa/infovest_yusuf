import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "../../components/ui/InputText";
import { Button } from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import InputSelectEvent from "../../components/ui/Select";
import InputDate from "../../components/ui/InputDate";
import Textarea from "../../components/ui/TextArea";

type FormData = {
  nama: string;
  category: string;
  date: string;
  bio: string;
};
const schema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  category: z.string().min(1, "Category harus dipilih"),
  date: z.string().min(1, "Tanggal harus diisi"),
  bio: z.string().max(100, "Bio maksimal 100 karakter"),
});

export default function EventCreate() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-black pb-4 mb-6">
        New Event
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-white p-6 flex flex-col gap-4 max-w-md"
      >
        <InputText
          label="New Event"
          nama="nama"
          register={register}
          error={errors.nama?.message}
        />
        <InputSelectEvent
          label="Pilih Category"
          nama="category"
          register={register}
          setValue={setValue}
          error={errors.category?.message}
        />
        <InputDate
          label="Tanggal Event"
          nama="date"
          register={register}
          setValue={setValue}
          error={errors.date?.message}
        />
          <Textarea
          label="Deskripsi Event"
          nama="bio"
          register={register}
          error={errors.bio?.message}
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
