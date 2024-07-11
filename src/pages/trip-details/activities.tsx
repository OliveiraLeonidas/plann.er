import { Activity, CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import {ptBR } from "date-fns/locale";
interface Activity {
    date: string
    activities: {
        id: string
        title: string
        occours_at: string
    }[]
}

export function Activities() {

    const {tripId} = useParams()
    const [activities, setActivities] = useState<Activity[]>([])

    //executa apenas se o tripId for alterado
    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])

    return (
    <div className="space-y-8">

        { activities.map(category => {
            return (
                <div key={category.date} className=" space-y-4">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-zinc-300">Dia {format(category.date, 'd', {locale: ptBR})}</span>
                        <span className="text-xs text-zinc-500"> {format(category.date, 'EEEE', {locale: ptBR})}</span>
                    </div>
                    {category.activities.length > 0 ? (
                        <div className="space-y-3">
                            {category.activities.map(activity => {
                                return (
                                      <div key={activity.id} className="space-y-2.5">
                                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                            <CircleCheck className="size-5 text-lime-300" />
                                            <span className="text-zinc-100">{activity.title}</span>
                                            <span className="text-zinc-400 text-sm ml-auto">
                                                {format(activity.occours_at, 'HH:mm')}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                    : (<p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>) }
                </div>
            )
        })}



        {/* <div className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300">Dia 18</span>
                <span className="text-xs text-zinc-500">Domingo</span>
            </div>
            <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">Academia em grupo</span>
                    <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                </div>
            </div>
            <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">Café da manhã</span>
                    <span className="text-zinc-400 text-sm ml-auto">09:00h</span>
                </div>
            </div>
        </div> */}
    </div>
    )
}