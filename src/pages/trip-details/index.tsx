import { Plus, User, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { CreateActivityModal } from "./create-activity-modal";
import { Button } from "../../components/button";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Trip {
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [isOpenParticipantConfirmation, setIsOpenParticipantConfirmation] = useState(false);
  const { tripId, participantId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const location = useLocation();
  const navigate = useNavigate()
  const [isConfirmationOwner, setIsConfirmationOwner] = useState(false)
  
  
    async function confirmTripParticipant(event: FormEvent<HTMLFormElement>) {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const name = data.get('name')?.toString()
            const email = data.get("email")?.toString();

            if(!name || !email){
                return
            }

            await api.post(`/trips/${tripId}/confirm/${participantId}`, {
              name: name,
              email: email,
              is_confirmed: true,
            });

            closeParticipantConfirmation()
            navigate(`/trips/${tripId}`);
            window.location.reload()
        }


  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
    if (trip?.is_confirmed == false || undefined) {
      setIsConfirmationOwner(true);
    }
        
    }, [tripId, trip?.is_confirmed]);

  useEffect(() => { 
    if(location.pathname == `/trips/${tripId}/confirm/${participantId}`) {
      setIsConfirmationOwner(false)
      openParticipantConfirmation();
    }
  }, [location.pathname, tripId, participantId]);
    
  useEffect(() => {
    if (location.pathname == `/trips/${tripId}/confirmation`) {
      console.log("evento confirmado");

      setIsConfirmationOwner(false);
    }
  }, [location.pathname, tripId]);

   
  const displayedDate = trip
     ? format(trip.starts_at, "d' de ' LLL")
         .concat(" até ")
         .concat(format(trip.ends_at, "d' de ' LLL"))
     : null;


  function openCreateActivityModalOpen() {
    setIsCreateActivityModalOpen(true);
  }
  function closeCreateActivityModalOpen() {
    setIsCreateActivityModalOpen(false);
  }

  function openParticipantConfirmation() {
    setIsOpenParticipantConfirmation(true);
  }

  function closeParticipantConfirmation() {
    setIsOpenParticipantConfirmation(false);
  }
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="px-4 flex gap-16">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivityModalOpen}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>
          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full  h-px bg-zinc-400" />
          <Guests />
        </div>
        {isCreateActivityModalOpen && (
          <CreateActivityModal
            closeCreateActivityModalOpen={closeCreateActivityModalOpen}
          />
        )}
      </main>

      {/* Confirmation modal */}

      {isOpenParticipantConfirmation && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confirmar participação
                </h2>
                <button type="button" onClick={closeParticipantConfirmation}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400 text-left">
                Para concluir a criação da viagem para{" "}
                <span className="font-semibold text-zinc-100">
                  {trip?.destination}
                </span>{" "}
                nas datas de{" "}
                <span className="font-semibold text-zinc-100">
                  {displayedDate}
                </span>{" "}
                Para confirmar sua presença na viagem, preencha os dados abaixo:
              </p>
            </div>

            <form onSubmit={confirmTripParticipant} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input
                  name="name"
                  placeholder="seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="seu email pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <Button type="submit" size="full" variant="primary">
                Confirmar minha presença
              </Button>
            </form>
          </div>
        </div>
      )}

      {isConfirmationOwner && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Confirmar viagem</h2>
              </div>
              <p className="text-sm text-zinc-400 text-left">
                Para concluir a criação da viagem para verifique seu email e
                clique no link, depois, recarregue a páginas{" "}
                <span className="font-semibold text-zinc-100">
                  {trip?.destination}
                </span>{" "}
                nas datas de{" "}
                <span className="font-semibold text-zinc-100">
                  {displayedDate}
                </span>{" "}
              </p>
            </div>

            <div className="space-y-3">
              <Button type="submit" size="full" variant="primary">
                atualizar página
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
