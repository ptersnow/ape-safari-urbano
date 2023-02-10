import { FastifyInstance } from "fastify"
import { z } from 'zod'

import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function answerRoutes (fastify: FastifyInstance) {
    fastify.get('/sidewalks/:sidewalkId/categories/:categoryId/answers', {
        onRequest: [authenticate]
    }, async (request, reply) => {
        const getAnswersParams = z.object({
            sidewalkId: z.string(),
            categoryId: z.string()
        })

        const { sidewalkId, categoryId } = getAnswersParams.parse(request.params)

        const answersGroup = await prisma.answer.groupBy({
            by: ['userId'],
            where: {
                sidewalkId,
                userId: request.user.sub,
                //userId: "clbp74sl90000il93mg4ktn93",
                question: {
                    categoryId
                }
            },
            _avg: {
                choice: true
            }
        })

        return reply.code(200).send({
            avg: answersGroup[0]?._avg.choice
        })
    })

    fastify.post('/sidewalks/:sidewalkId/answers', {
        onRequest: [authenticate]
    }, async (request, reply) => {
        const getAnswersParams = z.object({
            sidewalkId: z.string()
        })

        const getAnswersBody = z.array(z.object({
            questionId: z.string(),
            value: z.number()
        }))
        
        const { sidewalkId } = getAnswersParams.parse(request.params)
        const body = getAnswersBody.parse(request.body)

        body.map(async ({ questionId, value }) => {
            try {
                await prisma.answer.create({
                    data: {
                        sidewalkId,
                        questionId,
                        userId: request.user.sub,
                        //userId: "clbp74sl90000il93mg4ktn93",
                        choice: value
                    }
                })
            }  catch (error) {
                console.log(error)
            }
        })

        return reply.status(201).send()
    })
}