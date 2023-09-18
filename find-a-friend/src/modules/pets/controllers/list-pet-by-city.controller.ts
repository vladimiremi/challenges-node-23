import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsByCityUseCase } from '../usecases/factories/make-fetch-pets-by-city.usecase'

export async function listPetByCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    city: z.string(),
  })

  const { city } = querySchema.parse(request.query)

  const listPetByCity = makeFetchPetsByCityUseCase()

  const pets = await listPetByCity.execute(city)

  return reply.status(200).send({
    pets,
  })
}
