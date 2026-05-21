import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { useCreateCollectionDialog } from "../hooks/useCreateCollectionDialog";

export const CreateCollectionDialog = () => {
  const {
    open,
    title,
    description,
    setOpen,
    setTitle,
    setDescription,
    handleSubmit,
  } = useCreateCollectionDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón */}
      <DialogTrigger asChild>
        <Button>Nueva colección</Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-h-[90vh] flex flex-col max-w-lg w-full">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Crear nueva colección</DialogTitle>
        </DialogHeader>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-1">
          <div className="flex flex-col gap-4 mt-4">
            {/* Título */}
            <div>
              <label className="font-semibold">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full mt-1 box-border"
              />
            </div>
            <div>
              <label className="font-semibold">Descripción</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full mt-1 box-border"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t mt-4">
          <Button onClick={handleSubmit} className="w-full">
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
