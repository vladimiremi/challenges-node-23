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
    street: z.string(),
    number: z.string(),
    state: z.string(),
    cep: z.string(),
    neighborhood: z.string(),
    city: z.string(),
  })

  const {
    name,
    about,
    energy,
    phone,
    size,
    age,
    environment,
    independency,
    requisite,
    // address
    cep,
    city,
    neighborhood,
    number,
    state,
    street,
  } = createPetBodySchema.parse(request.body)

  const createPet = makeCreatePetUseCase()

  await createPet.execute({
    name,
    about,
    energy,
    phone,
    size,
    age,
    environment,
    independency,
    requisite,
    cep,
    city,
    neighborhood,
    number,
    state,
    street,
  })
  response.status(201).send()
}
