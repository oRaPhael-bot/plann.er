import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function GuestsPage() {
  const tripId = localStorage.getItem("Participant") || "0";
  localStorage.getItem("Participant");
  localStorage.setItem("Participant", "1");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log("ID da viagem:", tripId);
  console.log("Participantes:", participants);

  useEffect(() => {
    console.log("Fazendo requisição para:", `/trips/${tripId}/participants`);

    api
      .get(`/trips/${tripId}/participants`) // A URL base será automaticamente adicionada
      .then((response) => {
        console.log("Resposta completa da API:", response.data.participants);
        setParticipants(response.data.participants || []);
        setErrorMessage(null);
      })
      .catch((error) => {
        console.error("Erro ao buscar participantes:", error);
        setErrorMessage(
          "Erro ao buscar participantes. Verifique a conexão ou tente novamente mais tarde."
        );
      });
  }, [tripId]);
  localStorage.getItem("Participant");
  localStorage.setItem("Participant", "1"); // Substitua "1" pelo ID válido da viagem

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {errorMessage ? (
          <p className="text-red-400">{errorMessage}</p>
        ) : participants.length > 0 ? (
          participants.map((participant, index) => (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 w-full overflow-hidden">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Participant ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          ))
        ) : (
          <p className="text-zinc-400">Nenhum participante encontrado.</p>
        )}
      </div>
      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
