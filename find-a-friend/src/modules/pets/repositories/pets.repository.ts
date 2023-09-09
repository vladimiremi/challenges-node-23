import { Pet } from '../entities/pets.entity'

export interface ICreatePet {
  name: string
  about: string
  size: number
  energy: number
  phone: string
  address: string
}

export interface PetsRepository {
  create(data: ICreatePet): Promise<Pet>
}
