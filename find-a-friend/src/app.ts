import fastify from 'fastify'
import { petsRoutes } from './modules/pets/controllers/pet.routes'

export const app = fastify()

app.register(petsRoutes)

