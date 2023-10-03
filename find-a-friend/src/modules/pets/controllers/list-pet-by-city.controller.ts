import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsByCityUseCase } from '../usecases/factories/make-fetch-pets-by-city.usecase'

export async function listPetByCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    query: z.string(),
  })

  const result = querySchema.safeParse(request.query)
  if (!result.success) {
    console.log(result.error)
    throw new Error(
      `${result.error.errors[0].path[0]} ${result.error.errors[0].message}`,
    )
  }

  const listPetByCity = makeFetchPetsByCityUseCase()

  const pets = await listPetByCity.execute(result.data.query)

  return reply.status(200).send({
    pets,
  })
}
