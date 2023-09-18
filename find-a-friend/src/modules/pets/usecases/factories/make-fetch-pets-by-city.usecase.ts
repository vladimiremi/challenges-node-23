import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets.respository'
import { FetchPetsByCity } from '../fetch-pets-by-city.usecase'

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetByUseCase = new FetchPetsByCity(petsRepository)

  return fetchPetByUseCase
}
