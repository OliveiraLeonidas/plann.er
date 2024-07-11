import cors from '@fastify/cors';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrip } from './routes/confirm-trip';
import { createTrip } from './routes/create-trips';
import { confirmParticipant } from './routes/confirm-participant';
const app = fastify()


app.register(cors, {
    origin: true
})

// Fastify for http requests
// Prisma for automate some process on database (create tables, queries...)
// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)

const port = 3333

app.listen({port: port}).then(() => {
    console.log(`\nhttp://localhost:${port} is running 🤖`)
})