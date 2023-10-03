import { randomUUID } from 'node:crypto'
import { ICreatePet, PetsRepository } from '../pets.repository'
import { Pet } from '../../entities/pets.entity'

export class InMemoryPetRepository implements PetsRepository {
  public pets: Pet[] = []

  async findByCity(city: string): Promise<Pet[]> {
    return this.pets.filter((pet) => pet.city === city)
  }

  async find(query: string): Promise<Pet[]> {
    return await this.pets.filter(
      (pet) =>
        pet.city === query ||
        pet.name === query ||
        String(pet.energy) === query,
    )
  }

  async create(data: ICreatePet): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      energy: data.energy,
      phone: data.phone,
      size: data.size,
      age: data.age,
      environment: data.environment,
      independency: data.independency,
      requisite: data.requisite,
      cep: data.cep,
      city: data.city,
      neighborhood: data.neighborhood,
      number: data.number,
      state: data.state,
      street: data.street,
    }

    this.pets.push(pet)

    return pet
  }
}
