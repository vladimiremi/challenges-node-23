import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet.usecase'
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet.repository'

let petRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe('Create a Pet', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sut = new CreatePetUseCase(petRepository)
  })

  it('Should be able create a Pet', async () => {
    const pet = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
})
