import { prisma } from '../../../../lib/prisma'
import { Pet } from '../../entities/pets.entity'
import { ICreatePet, PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  async find(query: string): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        OR: [
          {
            city: query,
          },
        ],
      },
    })
  }

  async findByCity(city: string): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        city,
      },
    })
  }

  async create(data: ICreatePet): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
