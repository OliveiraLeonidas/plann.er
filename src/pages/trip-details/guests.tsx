import {
  AtSign,
  CircleCheck,
  CircleDashed,
  Plus,
  UserRoundCog,
  X,
} from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participant, setParticipants] = useState<Participants[]>([]);
  const [isOpenManagerGuest, setIsOpenManagerGuest] = useState(false);
  //executa apenas se o tripId for alterado
  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  const openManagerGuest = () => setIsOpenManagerGuest(true);
  const closeManagerGuest = () => setIsOpenManagerGuest(false);

  async function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      
      const data = new FormData(event.currentTarget);
      const email = data.get("email")?.toString();
      if (!email) {
        return;
      }
      
      console.log(email);
      await api.post(`/trips/${tripId}/invites`, {
        email
      }).then(() => {console.log('email enviado ao banco de dados!')});
      window.location.reload();
  }



  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-md">Convidados</h2>
      <div className="space-y-5">
        {participant.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant?.name ?? `convidado ${index}`}
                </span>
                <a href="" className="block text-xs text-zinc-400 truncate">
                  {participant?.email}
                </a>
              </div>
              {participant.is_confirmed ? (
                <CircleCheck className="text-lime-400 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
      <Button onClick={openManagerGuest} size="full" variant="secondary">
        <UserRoundCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isOpenManagerGuest && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Adicionar novos convidados
                </h2>
                <button type="button" onClick={closeManagerGuest}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-left">
                O convidado receberá um e-mail para confirmar.
              </p>
            </div>

            <form onSubmit={addNewEmailToInvite} className="space-y-2">
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <div className="px-2 flex items-center flex-1 gap-2">
                  <AtSign className="size-5 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Digite o e-mail do convidado?"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                </div>
              </div>
              <Button
                type="submit"
                size="full"
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-sm hover:bg-lime-400 flex items-center gap-2"
              >
                Enviar convite
                <Plus className="size-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
