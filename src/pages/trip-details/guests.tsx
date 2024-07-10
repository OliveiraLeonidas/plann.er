import { CircleCheck, CircleDashed, UserRoundCog } from "lucide-react";
import { Button } from "../../components/button";

export function Guests() {
    return (
                      <div className="space-y-6">
                        <h2 className="font-semibold text-md">Convidados</h2>
                        <div className="space-y-5">
                            {/* Link 1 */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="block font-medium text-zinc-100">Dr. Rita Pacocha</span>
                                    <a href="" className="block text-xs text-zinc-400 truncate">
                                        lacy.stiedemann@gmail.com
                                    </a>
                                </div>
                                <CircleCheck className="text-lime-400 size-5 shrink-0"/>
                            </div>


                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="block font-medium text-zinc-100">Jessica White</span>
                                    <span className="block text-xs text-zinc-400 truncate">
                                        jessica.white44@yahoo.com
                                    </span>
                                </div>
                                <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
                            </div>

                        </div>
                        <Button size="full" variant="secondary">
                            <UserRoundCog className="size-5"/>
                            Gerenciar convidados
                        </Button>
                    </div>
    )
}
