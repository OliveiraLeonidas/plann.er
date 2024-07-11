import { CircleCheck, CircleDashed, UserRoundCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";

interface Participants {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guests() {

    const {tripId} = useParams()
    const [participant, setParticipants] = useState<Participants[]>([])

    //executa apenas se o tripId for alterado
    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])

    return (
<div className="space-y-6">
    <h2 className="font-semibold text-md">Convidados</h2>
    <div className="space-y-5">
        
        {participant.map((participant, index) => {
            return (
                <div key={participant.id} className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">{participant?.name ?? `convidado ${index}`}</span>
                        <a href="" className="block text-xs text-zinc-400 truncate">
                            {participant?.email}
                        </a>
                    </div>
                    {participant.is_confirmed 
                    ? <CircleCheck className="text-lime-400 size-5 shrink-0"/>
                    : <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                    }
                </div>
            )
        })}

    </div>
    <Button size="full" variant="secondary">
        <UserRoundCog className="size-5"/>
        Gerenciar convidados
    </Button>
</div>
    )
}
