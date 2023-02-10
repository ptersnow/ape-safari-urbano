import Fastify from "fastify"
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/users'
import { answerRoutes } from './routes/answers'
import { categoryRoutes } from './routes/categories'
import { questionRoutes } from './routes/questions'
import { sidewalkRoutes } from './routes/sidewalks'


async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(jwt, {
        secret: 'ape-safari-urbano'
    })

    await fastify.register(authRoutes)
    await fastify.register(userRoutes)
    await fastify.register(answerRoutes)
    await fastify.register(categoryRoutes)
    await fastify.register(sidewalkRoutes)
    await fastify.register(questionRoutes)

    await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()