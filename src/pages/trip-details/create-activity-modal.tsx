import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
    closeCreateActivityModalOpen: () => void
}

export function CreateActivityModal({
    closeCreateActivityModalOpen
}:CreateActivityModalProps) {

    const {tripId} = useParams()

    async function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const occours_at = data.get('occours_at')?.toString()
        
        await api.post(`/trips/${tripId}/activities`, {
            title,
            occours_at
        })
        
        window.document.location.reload()
    }

    return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                    <button type="button" onClick={closeCreateActivityModalOpen}><X className="size-5 text-zinc-400"/></button>
                </div>
                    <p className="text-sm text-zinc-400">
                    Todos convidados podem visualizar as atividades.    
                </p>
            </div>

            <form onSubmit={createActivity} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Tag className="size-5 text-zinc-400" />
                    <input 
                    name="title"
                    placeholder="Qual a atividade?" 
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                </div>

                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <input 
                    type="datetime-local"
                    name="occours_at"
                    placeholder="Data e horário da atividade" 
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                </div>
                <Button
                    variant="primary"
                    size="full"
                    type="submit" 
                    className="w-full bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-sm hover:bg-lime-400 flex items-center justify-center gap-2">
                    Salvar atividade
                </Button>
            </form>
        </div>
    </div>
)}