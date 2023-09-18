import { Pet } from '../entities/pets.entity'
import { PetsRepository } from '../repositories/pets.repository'

interface ICreatePetUseCase {
  name: string
  about: string
  size: number
  energy: number
  independency: number
  age: number
  environment: number
  phone: string
  requisite: string
  // address
  street: string
  number: string
  state: string
  cep: string
  neighborhood: string
  city: string
}

export class CreatePetUseCase {
  constructor(private petRepository: PetsRepository) {}
  async execute(data: ICreatePetUseCase): Promise<Pet> {
    const pet = await this.petRepository.create(data)

    return pet
  }
}
