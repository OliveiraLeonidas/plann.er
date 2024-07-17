/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import  nodemailer from 'nodemailer'
import { getMailClient } from "../lib/mail";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function createInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/trips/:tripId/invites', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                email: z.string().email()
                
            })
        },
    }, 
        async (request) => {
        const { tripId } = request.params
        const { email } = request.body

        const trip = await prisma.trip.findUnique({ 
            where: {id: tripId} 
        })

        if(!trip) {
            throw new ClientError('Trip not found.')
        }

        const participant = await prisma.participant.create({
            data: {
                email,
                trip_id: tripId
            }
        })


        // Date formate
        const formattedStartDate = dayjs(trip.starts_at).format('LL')
        const formattedEndDate = dayjs(trip.ends_at).format('LL')

        
        const mail = await getMailClient()

        const confirmationLink = `${env.WEB_BASE_URL}/trips/${tripId}/confirm/${participant.id}`
        
        const message = await mail.sendMail({
        from: {
            name: 'Equipe plann.er',
            address: 'oi@plann.er'
        },
        to: participant.email,

        subject: `Confirme sua presença na viagem para ${trip.destination}`,
        html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong>, Brasil nas datas de <strong> ${formattedStartDate} até ${formattedEndDate}</strong>. </p>
                <p>Para confirmar sua presença viagem, clique no link abaixo: </p>
                <p></p>
                <p>
                    <a href="${confirmationLink}">
                        Confirmar viagem:
                    </a>
                </p>
                <p></p>
                <p>Caso esteja usando dispotivo móvel, você pode também confirmar a criação da viagem pelas aplicativos:</p>
                <p></p>
                <a href="#">Aplicativo para iphone</a>
                <p></p>
                <a href="#">Aplicativo para Android</a>
                <p></p>
                <p>Caso não saiba do que se trata esse email, apenas ignore!</p>
            </div>
        `.trim(),
            })
            
        console.log(nodemailer.getTestMessageUrl(message))

        return {participantsId: participant.id}
    })
}