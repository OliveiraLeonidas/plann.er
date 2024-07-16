/* eslint-disable @typescript-eslint/no-unused-vars */
import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface Trip {
    destination: string
    starts_at: string
    ends_at: string
}

export function DestinationAndDateHeader()  {
    const {tripId} = useParams()
    const [trip, setTrip] = useState<Trip | undefined>()
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [isOpenChangeData, setIsOpenChangeData] = useState(false)
    const [destination, setDestination] = useState(" ")
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
    
    //executa apenas se o tripId for alterado
    useEffect(() => {
        api.get(`/trips/${tripId}`)
        .then(response => setTrip(response.data.trip))
    }, [tripId])


     function openDatePicker() {
        return setIsDatePickerOpen(true)
    }
    function closeDatePicker() {
        return setIsDatePickerOpen(false)
    }


    const displayedDate = trip
    ? format(trip.starts_at, "d' de ' LLL").concat(' até ').concat(format(trip.ends_at, "d' de ' LLL"))
    : null

    function handleDatePicker(dateRange: DateRange | undefined) {
        setEventStartAndEndDates(dateRange)
    }

    function openDataChange(){
        setIsOpenChangeData(true)
    }
    const newDisplayDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates?.from, "d' de ' LLL", {locale: ptBR}).concat(' até ').concat(format(eventStartAndEndDates.to, "d' de ' LLL", {locale: ptBR}))
    : ' '
    async function updateTrip(){

        if(!destination || !eventStartAndEndDates) {
            return console.log("missing data: ", {destination, eventStartAndEndDates})
        }


        //atualizando dados da viagem
        await api.put(`/trips/${tripId}`, {
            destination, 
            starts_at: eventStartAndEndDates?.from,
            ends_at: eventStartAndEndDates?.to
        })

        setIsOpenChangeData(false)
        console.log("new data: ", {destination, eventStartAndEndDates})
        window.document.location.reload()
    }

    return (
    <div>
        {
        isOpenChangeData ? (
            <div className="h-16 bg-zinc-900 px-3 rounded-xl flex items-center shadow-shape gap-2">
                <div className="flex items-center gap-2 flex-1 w-full">
                        <MapPin className="size-5 text-zinc-400"/>
                        <input 
                            onChange={event => setDestination(event.currentTarget.value)}
                            type="text"
                            defaultValue={trip?.destination}
                            className="bg-transparent text-md placeholder-zinc-400 w-[80%] outline-none"/>
                </div>

                <button onClick={openDatePicker} className="flex items-center gap-2 text-left W-[200px]">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-md text-zinc-400 flex-1">
                        {displayedDate || newDisplayDate }
                    </span>
                </button>

                {isDatePickerOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selecione a data: </h2>
                                <button type="button" onClick={closeDatePicker}><X className="size-5 text-zinc-400"/></button>
                            </div>
                        </div>
                        <DayPicker locale={ptBR} mode='range' selected={eventStartAndEndDates} onSelect={handleDatePicker}/>
                        </div>
                    </div>
                )}

                <div className="w-px h-8 bg-zinc-800" />


            
                <Button onClick={updateTrip} variant="primary">
                    Alterar
                    <ArrowRight className="size-5"/>
                </Button>
                
            </div>
        )
        : (
            <div className="px-4 h-16 rounded-lg bg-zinc-900 shadow-shape flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400"/>
                    <span className="text-md text-zinc-100">{trip?.destination}</span>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-zinc-400"/>
                        <span className="text-md text-zinc-100">
                            {isOpenChangeData ? newDisplayDate : displayedDate}
                        </span>
                    </div>

                    <div className="w-px h-6 bg-zinc-800" />

                    <Button onClick={openDataChange} variant="secondary" className="flex-1">
                        Alterar local/data
                        <Settings2 className="size-5"/>
                    </Button>
                </div>
            </div>
        )
        }
    </div>
    )
}