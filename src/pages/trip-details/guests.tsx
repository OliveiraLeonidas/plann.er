import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Tag,
  UserRoundCog,
  X,
} from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

      {isOpenManagerGuest ? (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Convidados</h2>
                <button type="button">
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Todos convidados podem visualizar as atividades.
              </p>
            </div>

            <form
              onSubmit={() => {
                setIsOpenManagerGuest(false);
              }}
              className="space-y-3"
            >
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="size-5 text-zinc-400" />
                <input
                  name="title"
                  placeholder="Qual a atividade?"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input
                  type="datetime-local"
                  name="occours_at"
                  placeholder="Data e horário da atividade"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <Button
                variant="primary"
                size="full"
                type="submit"
                className="w-full bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-sm hover:bg-lime-400 flex items-center justify-center gap-2"
              >
                Salvar atividade
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div>Fechado</div>
      )}
    </div>
  );
}
