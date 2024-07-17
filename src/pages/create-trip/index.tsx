/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invite-guest-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDatePage } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"
import { endOfDay } from "date-fns"
  

export function CreateTripPage() {
    const navigate = useNavigate()
    const [isGuestInputOpen, setGuestInputOpen] = useState(false)
    const [isGuestModalOpen, setGuestModalOpen] = useState(false)
    const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false)

    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()


    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

    const openGuestInput = () => setGuestInputOpen(true);
    const closeGuestInput = () => setGuestInputOpen(false); 

    function openGuestModal() {
      setGuestModalOpen(true)
    }
    function closeGuestModal() {
      setGuestModalOpen(false)
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      const email = data.get('email')?.toString()
      if (!email) {
        return
      }

      if (emailsToInvite.includes(email)) {
        return
      }
      setEmailsToInvite([...emailsToInvite, email])
      console.log(email)
      event.currentTarget.reset()
    }

    function removeEmailFromInvite(emailToRemove: string){
      // saving all the emails in a new list, except the email we need remove
      const newEmailList = emailsToInvite.filter(email => email != emailToRemove)
      setEmailsToInvite(newEmailList)
    }

    function openConfirmTripModal() {
      setConfirmTripModalOpen(true)
    } 
    
    function closeConfirmTripModal() {
      setConfirmTripModalOpen(false)
    }


    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(destination)
        console.log(ownerName)
        console.log(ownerEmail)
        console.log(eventStartAndEndDates)
        console.log(emailsToInvite)
        if(!destination){
          return
        }
        if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to){
          return
        }

        if(emailsToInvite.length === 0){
          return
        }

        if(!ownerName || !ownerEmail){
          return
        }

        const response = await api.post('/trips',  {
          destination, 
          starts_at: eventStartAndEndDates.from, 
          ends_at: endOfDay(eventStartAndEndDates.to),
          emails_to_invite: emailsToInvite,
          owner_name: ownerName,
          owner_email: ownerEmail
        })
        console.log(response.data)

        const {tripId} = response.data
        
        navigate(`/trips/${tripId}`)
        console.log(tripId)
    }
    
  
    return ( 
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="./src/assets/Logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
          </div>
          <div className="space-y-4">
            
            <DestinationAndDatePage 
                closeGuestInput={closeGuestInput}
                openGuestInput={openGuestInput}
                isGuestInputOpen={isGuestInputOpen}
                setDestination={setDestination}
                eventStartAndEndDates={eventStartAndEndDates}
                setEventStartAndEndDates={setEventStartAndEndDates}
            />

          { isGuestInputOpen && (
              <InviteGuestsStep
                emailsToInvite={emailsToInvite}
                openConfirmTripModal={openConfirmTripModal}
                openGuestModal={openGuestModal}
              />)
          }


          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
            com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
          </p>
        </div>


        {isGuestModalOpen && (
            <InviteGuestsModal
                emailsToInvite={emailsToInvite}
                addNewEmailToInvite={addNewEmailToInvite}
                closeGuestModal={closeGuestModal}
                removeEmailFromInvite={removeEmailFromInvite}
            /> 
        )}

        {/* Confirmação de viagem */}
        { isConfirmTripModalOpen && ( 
             <ConfirmTripModal 
                closeConfirmTripModal={closeConfirmTripModal}
                createTrip={createTrip}
                setOwnerName={setOwnerName}
                setOwnerEmail={setOwnerEmail}
                destination={destination}
                eventStartAndEndDates={eventStartAndEndDates}
                
            />

        )}

      </div>
    </div>
    )
}
