import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  // const { tripId } = useParams();
  const tripId = localStorage.getItem("tripId") || "0";
  console.log("ID da viagem:", tripId);
  const [trip, setTrip] = useState<Trip | undefined>();
  console.log("Trip:", trip);

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data));
  }, [tripId]);

  const displayedDate =
    trip && trip.starts_at && trip.ends_at
      ? format(new Date(trip.starts_at), "d' de 'LLL")
          .concat(" até ")
          .concat(format(new Date(trip.ends_at), "d' de 'LLL"))
      : "Data inválida";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then((response) => {
        setTrip(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da viagem:", error);
        setIsLoading(false);
      });
  }, [tripId]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
