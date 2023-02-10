import { FastifyInstance } from "fastify"
import { z } from 'zod'

import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function categoryRoutes (fastify: FastifyInstance) {
    fastify.get('/sidewalks/:sidewalkId/categories', {
        onRequest: [authenticate]
    }, async (request, reply) => {

        const getCategoriesParams = z.object({
            sidewalkId: z.string()
        })

        const { sidewalkId } = getCategoriesParams.parse(request.params)

        const categories = await prisma.category.findMany({
            include: {
                questions: {
                    include: {
                        choices: true,
                    }
                },
                _count: {
                    select: {
                        questions: {
                            where: {
                                answers: {
                                    some: {
                                        sidewalkId,
                                        userId: request.user.sub
                                        //userId: "clbp74sl90000il93mg4ktn93"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return reply.code(200).send({ categories })
    })
}