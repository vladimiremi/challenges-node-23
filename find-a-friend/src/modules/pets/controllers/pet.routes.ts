import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet.controller'
import { listPetByCityController } from './list-pet-by-city.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', createPet)
  app.get('/pets/city', listPetByCityController)
}
