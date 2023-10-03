import { Pet } from '../entities/pets.entity'

export interface ICreatePet {
  name: string
  about: string
  size: number
  energy: number
  phone: string
  requisite: string
  independency: number
  age: number
  environment: number
  // address
  street: string
  number: string
  state: string
  cep: string
  neighborhood: string
  city: string
}

export interface PetsRepository {
  create(data: ICreatePet): Promise<Pet>
  findByCity(query: string): Promise<Pet[]>
  find(query: string): Promise<Pet[]>
}
