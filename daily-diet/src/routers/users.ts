import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcrypt'

export async function users(app: FastifyInstance) {
  app.post('/user', async (req, res) => {
    const createTransactionBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createTransactionBodySchema.parse(
      req.body,
    )

    const passwordHash = await hash(password, 8)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: passwordHash,
    })

    return res.status(201).send()
  })

  app.get('/users', async (req, res) => {
    const transactions = await knex('users').select()

    return res.send(transactions)
  })
}
