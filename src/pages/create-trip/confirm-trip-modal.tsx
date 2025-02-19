import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
interface confirmTripModalProps {
    destination: string
    eventStartAndEndDates: DateRange | undefined
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (ownerName: string) => void 
    setOwnerEmail: (ownerEmail: string) => void
}


export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail,
    destination,
    eventStartAndEndDates

    }:confirmTripModalProps) {

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
    ? format(eventStartAndEndDates.from, "d' de ' MMMM", {locale: ptBR}).concat(' até ').concat(format(eventStartAndEndDates.to, "d' de ' MMMM 'de' yyyy",  {locale: ptBR}))
    : null
    console.log({destination, eventStartAndEndDates})
    return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
                <button type="button" onClick={closeConfirmTripModal}><X className="size-5 text-zinc-400"/></button>
                </div>
                <p className="text-sm text-zinc-400 text-left">
                Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">{destination} </span>  
                nas datas de <span className="font-semibold text-zinc-100">{displayedDate} </span>preencha seus dados abaixo:
                </p>
            </div>

            <form onSubmit={createTrip} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <User className="size-5 text-zinc-400" />
                    <input 
                    onChange={event => setOwnerName(event.target.value)}
                        name="name"
                        placeholder="seu nome completo" 
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                </div>
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <User className="size-5 text-zinc-400" />
                    <input 
                        onChange={event => setOwnerEmail(event.target.value)}
                        type="email"
                        name="email"
                        placeholder="seu email pessoal" 
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                </div>
                <Button
                size="full"
                    variant="primary"
                    type="submit">
                    Confirmar criação da viagem
                </Button>
            </form>
            </div>
        </div>
    )
}