import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
    return (
            <div className="space-y-6">
                <h2 className="font-semibold text-md">Links importantes</h2>
                <div className="space-y-5">


                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">Reserve do Airbnb</span>
                            <a href="https://efficient-sloth-d85.notion.site/NLW-JOURNEY-Guia-do-evento-c16d91a2edc64f8182585d4bec6d33e9#8b3e9c84726d480eaf57b615ee16fec2" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                            https://efficient-sloth-d85.notion.site/NLW-JOURNEY-Guia-do-evento-c16d91a2edc64f8182585d4bec6d33e9#8b3e9c84726d480eaf57b615ee16fec2
                            </a>
                        </div>
                        <Link2 className="text-zinc-400 size-5 shrink-0"/>
                    </div>


                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">Reserve do Airbnb</span>
                            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                                https://efficient-sloth-d85.notion.site/NLW-JOURNEY-Guia-do-evento-c16d91a2edc64f8182585d4bec6d33e9#8b3e9c84726d480eaf57b615ee16fec2
                            </a>
                        </div>

                        <Link2 className="text-zinc-400 size-5 shrink-0"/>
                    </div>

                </div>

                <Button variant="secondary" size="full">
                    <Plus className="size-5"/>
                    Cadastrar novo link
                </Button>
            </div>
    )
}