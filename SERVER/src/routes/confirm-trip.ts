/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
import { z } from "zod";
dayjs.locale('pt-br')
dayjs.extend(localizedFormat)

export async function confirmTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        },
    }, 
        async (request) => {

        return {tripId: request.params.tripId}
    })
}