import { randomUUID } from 'node:crypto'
import { ICreatePet, PetsRepository } from '../pets.repository'
import { Pet } from '../../entities/pets.entity'

export class InMemoryPetRepository implements PetsRepository {
  public pets: Pet[] = []
  async create(data: ICreatePet): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      address: data.address,
      energy: data.energy,
      phone: data.phone,
      size: data.size,
      age: data.age,
      environment: data.environment,
      independency: data.independency,
      requisite: data.requisite,
    }

    this.pets.push(pet)

    return pet
  }
}
