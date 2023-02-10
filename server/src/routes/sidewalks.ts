import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function sidewalkRoutes (fastify: FastifyInstance) {

    fastify.get('/sidewalks', {
    }, async (request, reply) => {
        console.log(request)

        const sidewalks = await prisma.sidewalk.findMany()

        return reply.status(200).send({ sidewalks })
    })

    fastify.post('/sidewalks', {
        onRequest: [authenticate]
    }, async (request, reply) => {
        const createSidewalkBody = z.object({
            name: z.string(),
            start: z.string().optional(),
            end: z.string().optional(),
        })

        const { name, start, end } = createSidewalkBody.parse(request.body)

        await prisma.sidewalk.create({
            data: {
                name,
                start: start === undefined ? "" : start,
                end: end === undefined ? "" : end
            }
        })

        return reply.status(201).send()
    })
}