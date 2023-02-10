import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"

import bcrypt from "bcrypt"

export async function userRoutes (fastify: FastifyInstance) {

    fastify.get('/', async (request, reply) => {
        
        const users = await prisma.user.findMany()

        return reply.status(200).send({ users })
    })

    fastify.post('/users/register', async (request, reply) => {
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

        if (user) {
            return reply.status(400).send({
                message: "Usuário já cadastrado"
            })
        }

        bcrypt.hash(password, 10, async (error: any, hash: string) => {
            if (error) {
                return reply.status(500).send({
                    message: "Erro ao processar solicitação"
                })
            }
           
            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: hash
                }
            })

            const token = fastify.jwt.sign({
                name: user.name,
                avatarUrl: user.avatarUrl
            }, {
                sub: user.id
            })

            return reply.status(201).send({ token })
        })
    })
}