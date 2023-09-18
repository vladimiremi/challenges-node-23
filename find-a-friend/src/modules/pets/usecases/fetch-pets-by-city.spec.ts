import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCity } from './fetch-pets-by-city.usecase'
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet.repository'

let petRepository: InMemoryPetRepository
let sut: FetchPetsByCity

describe('List all pets in a city', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sut = new FetchPetsByCity(petRepository)
  })

  it('Should be able to list pets in a city', async () => {
    await petRepository.create({
      about: 'teste',
      energy: 5,
      name: 'Kilate',
      phone: '86981266700',
      size: 3,
      age: 2,
      environment: 2,
      independency: 1,
      requisite: 'Requisite Teste',
      street: 'Povoado Caldeirão',
      number: '164',
      state: 'PI',
      cep: '64333000',
      neighborhood: 'Zona Rural',
      city: 'Assunção do Piauí',
    })

    await petRepository.create({
      about: 'teste',
      energy: 5,
      name: 'Kilate',
      phone: '86981266700',
      size: 3,
      age: 2,
      environment: 2,
      independency: 1,
      requisite: 'Requisite Teste',
      street: 'Povoado Caldeirão',
      number: '164',
      state: 'PI',
      cep: '64333000',
      neighborhood: 'Zona Rural',
      city: 'São Miguel',
    })

    const pets = await sut.execute('Assunção do Piauí')

    expect(pets.length).toEqual(1)
  })
})
