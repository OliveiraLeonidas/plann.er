import fastify from 'fastify'
import cors from '@fastify/cors'
import { createTrip } from './routes/create-trips'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrip } from './routes/confirm-trip';
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
const port = 3333

app.listen({port: port}).then(() => {
    console.log(`\nhttp://localhost:${port} is running 🤖`)
})