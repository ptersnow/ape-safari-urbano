import { FastifyInstance } from "fastify"
import { z } from 'zod'

import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function questionRoutes (fastify: FastifyInstance) {

    fastify.get('/questions/:categoryId', {
        onRequest: [authenticate]
    }, async (request, reply) => {
        const getQuestionsParams = z.object({
            categoryId: z.string()
        })

        const { categoryId } = getQuestionsParams.parse(request.params)

        const questions = await prisma.question.findMany({
            where: {
                categoryId
            },
            include: {
                choices: true
            }
        })

        return reply.code(200).send({ questions })
    })

    fastify.get('/sidewalks/:sidewalkId/questions', {
       // onRequest: [authenticate]
    }, async (request, reply) => {
        const getQuestionsParams = z.object({
            sidewalkId: z.string()
        })

        const { sidewalkId } = getQuestionsParams.parse(request.params)

        const questions = await prisma.question.findMany()

        return reply.code(200).send({ questions })
    })

    fastify.get('/sidewalks/:sidewalkId/questions/:questionId', {
        //onRequest: [authenticate]
    }, async (request, reply) => {
        const getQuestionsParams = z.object({
            sidewalkId: z.string(),
            questionId: z.string()
        })

        const { sidewalkId, questionId } = getQuestionsParams.parse(request.params)

        const question = await prisma.question.findUnique({
            where: {
                id: questionId
            },
            include: {
                choices: true
            }
        })

        return reply.code(200).send({ question })
    })
}