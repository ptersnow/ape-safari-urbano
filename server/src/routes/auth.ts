import { FastifyInstance } from "fastify"
import { z } from 'zod'

import bcrypt from "bcrypt"

import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function authRoutes (fastify: FastifyInstance) {
    fastify.get('/me', {
            onRequest: [authenticate]
        }, async (request) => {
            return { user: request.user }
        }
    )

    fastify.post('/users/signin', async (request, reply) => {
        const postUserBody = z.object({
            email: z.string(),
            password: z.string()
        })

        const { email, password } = postUserBody.parse(request.body)

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return reply.status(400).send({
                message: "Usuário não cadastrado",
            })
        }

        if (!user.password) {
            return reply.status(400).send({
                message: "Senha inválida",
            })
        }
        else {
            const verified = await bcrypt.compare(password, user.password)

            if (!verified) {
                return reply.status(400).send({
                    message: "Senha inválida",
                })
            }

            const accessToken = fastify.jwt.sign({
                name: user.name,
                avatarUrl: user.avatarUrl
            }, {
                sub: user.id,
                expiresIn: '7 days'
            })

            return reply.status(200).send({
                accessToken,
                message: "Logado com sucesso."
            })
        }
    })
}