import cors from '@fastify/cors';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrip } from './routes/confirm-trip';
import { createTrip } from './routes/create-trips';
import { confirmParticipant } from './routes/confirm-participant';
import { createActivity } from './routes/create-activity';
import { getActivities } from './routes/get-activities';
import { createLink } from './routes/create-link';
import { getLinks } from './routes/get-links';
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
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)

const port = 3333

app.listen({port: port}).then(() => {
    console.log(`\nhttp://localhost:${port} is running 🤖`)
})