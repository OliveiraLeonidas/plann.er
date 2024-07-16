/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link2, Plus, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Link {
    id: string
    title: string
    url: string

}

export function ImportantLinks() {
    //adicionar modal de links
    const {tripId} = useParams()
    const [links, setLinks] = useState<Link[]>([])
    const [isLinksModalOpen, setIsLinksModalOpen] = useState(false)
    const openModalLinks = () => setIsLinksModalOpen(true)
    const closeModalLinks = () => setIsLinksModalOpen(false)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    useEffect(()=> {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
    }, [tripId])

    console.log({title, url})

    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const titleLink = data.get('title')?.toString()
        const linkUrl = data.get('link_url')?.toString()
        if (!linkUrl || !titleLink){
            return
        }

        await api.post(`/trips/${tripId}/links`, {
            title: titleLink,
            url: linkUrl
        })

        setUrl(linkUrl)
        setTitle(titleLink)
        
        console.log({titleLink, linkUrl})
        
        
        //window.document.location.reload()
        closeModalLinks()
    }


    return (
    <div className="space-y-6">
        <h2 className="font-semibold text-md">Links importantes</h2>
        <div className="space-y-5">

        {
            
            links.map(link => {
                return (
                     <div key={link.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">{link.title}</span>
                            <a href={link.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                                {link.url}
                            </a>
                        </div>

                        <Link2 className="text-zinc-400 size-5 shrink-0"/>
                    </div> 

                )
            })

            
        }

            

            {/* 
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">Reserve do Airbnb</span>
                    <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                        https://efficient-sloth-d85.notion.site/NLW-JOURNEY-Guia-do-evento-c16d91a2edc64f8182585d4bec6d33e9#8b3e9c84726d480eaf57b615ee16fec2
                    </a>
                </div>

                <Link2 className="text-zinc-400 size-5 shrink-0"/>
            </div> 
            */}

        </div>
    

        <Button onClick={openModalLinks} variant="secondary" size="full">
            <Plus className="size-5"/>
            Cadastrar novo link
        </Button>
        
        { isLinksModalOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Cadastrar novo link</h2>
                            <button onClick={closeModalLinks} type="button"><X className="size-5 text-zinc-400"/></button>
                        </div>
                            <p className="text-sm text-zinc-400">
                            Todos convidados podem visualizar links importantes.    
                        </p>
                    </div>

                    <form onSubmit={createLink} className="space-y-3">
                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Tag className="size-6 text-zinc-400" />
                            <input 
                            name="title"
                            placeholder="Título do link" 
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                        </div>

                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Link2 className="size-6 text-zinc-400" />
                            <input 
                            type="url"
                            name="link_url"
                            placeholder="URL" 
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                        </div>
                        <Button
                            variant="primary"
                            size="full"
                            type="submit" 
                            className="w-full bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-sm hover:bg-lime-400 flex items-center justify-center gap-2">
                            Salvar link
                        </Button>
                    </form>
                </div>
            </div>
        )}
    </div>
    )
}