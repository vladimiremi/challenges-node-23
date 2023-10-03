import { Pet } from '../entities/pets.entity'
import { PetsRepository } from '../repositories/pets.repository'

export class FetchPetsByCity {
  constructor(private petRepository: PetsRepository) {}
  async execute(query: string): Promise<Pet[]> {
    return await this.petRepository.findByCity(query)
  }
}
