import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreatePetUseCase } from '../usecases/factories/make-create-pre.usecase'
import { z } from 'zod'

export async function createPet(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    size: z.number(),
    energy: z.number(),
    independency: z.number(),
    age: z.number(),
    environment: z.number(),
    requisite: z.string(),
    phone: z.string(),
    address: z.string(),
  })

  const {
    name,
    about,
    address,
    energy,
    phone,
    size,
    age,
    environment,
    independency,
    requisite,
  } = createPetBodySchema.parse(request.body)

  const createPet = makeCreatePetUseCase()

  await createPet.execute({
    name,
    about,
    address,
    energy,
    phone,
    size,
    age,
    environment,
    independency,
    requisite,
  })
  response.status(201).send()
}
