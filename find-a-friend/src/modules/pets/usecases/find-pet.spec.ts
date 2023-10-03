import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet.repository'
import { FindPets } from './find-pet.usecase'
let petRepository: InMemoryPetRepository
let sut: FindPets
describe('Find Pet', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sut = new FindPets(petRepository)
  })

  it('Should be able find pet by city', async () => {
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

    const pets = await sut.execute('Assunção do Piauí')

    expect(pets).toEqual([
      expect.objectContaining({ city: 'Assunção do Piauí' }),
    ])
  })

  it('Should be able find pet by your characteristics', async () => {
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
      city: 'Teresina',
    })

    const petsName = await sut.execute('Kilate')

    expect(petsName).toEqual([expect.objectContaining({ name: 'Kilate' })])

    const petsEnergy = await sut.execute('5')

    expect(petsEnergy).toEqual([expect.objectContaining({ energy: 5 })])
  })
})
