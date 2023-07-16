import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { authentication } from '../middlewares/authentication'

export async function snacks(app: FastifyInstance) {
  app.post('/snack', { preHandler: [authentication] }, async (req, res) => {
    const createTransactionBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })

    const { name, description, isDiet } = createTransactionBodySchema.parse(
      req.body,
    )

    const { id } = req.user

    await knex('snacks').insert({
      id: randomUUID(),
      name,
      description,
      user_id: id,
      is_diet: isDiet,
    })

    return res.status(201).send()
  })

  app.get('/snacks', { preHandler: [authentication] }, async (req, res) => {
    const { id } = req.user

    const transactions = await knex('snacks').select().where({ user_id: id })

    return res.send(transactions)
  })

  // app.get('/snacks/all', async (req, res) => {
  //   const transactions = await knex('users').select()

  //   return res.send(transactions)
  // })
}
