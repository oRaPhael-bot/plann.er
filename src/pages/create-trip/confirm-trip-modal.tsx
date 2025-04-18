import { X, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { format } from "date-fns";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  const [trip, setTrip] = useState<Trip | undefined>();
  const displayDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d' de 'LLL"))
    : null;
  console.log(displayDate);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar a criação da viagem
            </h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className=" text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              Florianópoolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              16 e 27 de Agosto de 2024
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="full">
            Confirmar a criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
