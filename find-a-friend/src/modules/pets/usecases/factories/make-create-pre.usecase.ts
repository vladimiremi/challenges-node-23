import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets.respository'
import { CreatePetUseCase } from '../create-pet.usecase'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(petsRepository)

  return createPetUseCase
}
