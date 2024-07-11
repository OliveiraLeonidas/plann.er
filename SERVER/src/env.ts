import {z} from 'zod'

const envShcema = z.object({
    DATABASE_URL: z.string().url(),
    API_BASE_URL: z.string().url(),
    WEB_BASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3333)

})

export const env = envShcema.parse(process.env)