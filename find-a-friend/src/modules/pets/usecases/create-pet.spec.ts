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
      address: 'teste',
      energy: 5,
      name: 'Vladimir',
      phone: '86981266700',
      size: 3,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
