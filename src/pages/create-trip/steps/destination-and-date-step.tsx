/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react"
import { Button } from "../../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DestinationAndDatePageProps {
    isGuestInputOpen: boolean
    eventStartAndEndDates: DateRange | undefined
    closeGuestInput: () => void
    openGuestInput: () => void
    setDestination: (destination: string) => void
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDatePage({
    isGuestInputOpen,
    closeGuestInput,
    openGuestInput,
    setDestination,
    eventStartAndEndDates,
    setEventStartAndEndDates
}: DestinationAndDatePageProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }
    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
    ? format(eventStartAndEndDates.from, "d' de ' MMM", {locale: ptBR}).concat(' até ').concat(format(eventStartAndEndDates.to, "d' de ' MMM 'de' yyyy",  {locale: ptBR}))
    : null
    return (
        <div className="h-16 bg-zinc-900 px-3 rounded-xl flex items-center shadow-shape gap-2">
          <div className="flex items-center gap-2 flex-1 w-full">
                <MapPin className="size-5 text-zinc-400"/>
                <input 
                    onChange={event => setDestination(event.target.value)}
                    disabled={isGuestInputOpen} 
                    type="text" 
                    placeholder="Para onde você vai?" 
                    className="bg-transparent text-md placeholder-zinc-400 w-[80%] outline-none"/>
          </div>

          <button onClick={openDatePicker} disabled={isGuestInputOpen} className="flex items-center gap-2 text-left W-[200px]">
            <Calendar className="size-5 text-zinc-400"/>
            <span className="text-md text-zinc-400 flex-1">
                  {displayedDate || 'Quando?'}
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
                  <DayPicker disabled={{before: new Date()}} mode='range' selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
                </div>
            </div>
          )}

          <div className="w-px h-8 bg-zinc-800" />


          {isGuestInputOpen ? (
          <Button variant="secondary" onClick={closeGuestInput} >
            Alterar local/data
            <Settings2 className="size-5"/>
          </Button>):
            <Button variant="primary" onClick={openGuestInput} >
            Continuar
            <ArrowRight className="size-5"/>
          </Button>
          }
        </div>
          
    )
}