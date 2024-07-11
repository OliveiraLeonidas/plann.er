import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepPageProps {
    emailsToInvite: string[]
    openGuestModal: () => void
    openConfirmTripModal: () => void
}

export function InviteGuestsStep({
    emailsToInvite,
    openConfirmTripModal,
    openGuestModal
}:InviteGuestsStepPageProps) {

    return (
         <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
                  {/* icons */}
                  <div className="flex items-center gap-2 flex-1 text-left">
                    <UserRoundPlus className="size-5 text-zinc-400"/>
                    {
                      emailsToInvite.length > 0 
                      ? (<span onClick={openGuestModal} className="text-zinc-100 text-lg flex-1">{emailsToInvite.length} pessoa(s) convidada(s)</span>) 
                      : (<span onClick={openGuestModal} className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>)}
                  </div>
                
                  <div className="w-px bg-zinc-800"></div>
                  <Button variant="primary" onClick={openConfirmTripModal}>
                    Confirmar viagem
                    <ArrowRight className="size-5"/>
                  </Button>
              </div>
    )
}