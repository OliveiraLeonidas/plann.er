import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from 'nodemailer';
import { z } from "zod";
import { dayjs } from '../lib/dayjs';
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";
import { env } from "../env";
import { ClientError } from "../errors/client-error";

export async function confirmTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/trips/:tripId/confirmation', {
        schema: {
            params: z.object({
                tripId: z.string().uuid(),
            }),
        },
    }, 
        async (request, reply) => {
            const { tripId } = request.params;

            const trip = await prisma.trip.findUnique({
                where: { id: tripId },
                include: {
                    participants: true
                }
            });

            if (!trip) {
                throw new ClientError('Trip not found.');
            }

            const owner = trip.participants.find(participant => participant.is_owner);
            
            if (!owner) {
                throw new ClientError('Owner not found.');
            }
            await prisma.participant.update({
                where: { id: owner.id },
                data: { is_confirmed: true },
            });

            if (trip.is_confirmed) {
                return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
            }

            await prisma.trip.update({
                where: { id: tripId },
                data: { is_confirmed: true },
            });


            const formattedStartDate = dayjs(trip.starts_at).format('LL');
            const formattedEndDate = dayjs(trip.ends_at).format('LL');

            const mail = await getMailClient();

            await Promise.all(
                trip.participants.map(async (participant) => {
                    if (!participant.is_owner) {
                        const confirmationLink = `${env.WEB_BASE_URL}/trips/${tripId}/confirm/${participant.id}`;
                        const message = await mail.sendMail({
                            from: {
                                name: 'Equipe plann.er',
                                address: 'oi@plann.er'
                            },
                            to: participant.email,
                            subject: `Confirme sua presença na viagem para ${trip.destination}`,
                            html: `
                                <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                                    <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong>, Brasil nas datas de <strong>${formattedStartDate} até ${formattedEndDate}</strong>.</p>
                                    <p>Para confirmar sua presença viagem, clique no link abaixo:</p>
                                    <p>
                                        <a href="${confirmationLink}">
                                            Confirmar viagem
                                        </a>
                                    </p>
                                    <p>Caso esteja usando dispositivo móvel, você pode também confirmar a criação da viagem pelos aplicativos:</p>
                                    <p><a href="#">Aplicativo para iPhone</a></p>
                                    <p><a href="#">Aplicativo para Android</a></p>
                                    <p>Caso não saiba do que se trata esse email, apenas ignore!</p>
                                </div>
                            `.trim(),
                        });

                        console.log(nodemailer.getTestMessageUrl(message));
                    }
                })
            );

            return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`);
        }
    );
}
