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
    phone: z.string(),
    address: z.string(),
  })

  const { name, about, address, energy, phone, size } =
    createPetBodySchema.parse(request.body)

  const createPet = makeCreatePetUseCase()

  createPet.execute({ name, about, address, energy, phone, size })
  response.status(201).send()
}
