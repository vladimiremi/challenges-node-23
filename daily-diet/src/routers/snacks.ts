import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { authentication } from '../middlewares/authentication'
import { AppError } from '../utils/errors'

export async function snacks(app: FastifyInstance) {
  app.post('/snack', { preHandler: [authentication] }, async (req, res) => {
    const createBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })

    const { name, description, isDiet } = createBodySchema.parse(req.body)

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

  app.put('/snack/:id', { preHandler: [authentication] }, async (req, res) => {
    const createBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })

    const getParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { name, description, isDiet } = createBodySchema.parse(req.body)

    const { id } = getParamsSchema.parse(req.params)

    const { id: userId } = req.user

    await knex('snacks')
      .update({
        name,
        description,
        is_diet: isDiet,
      })
      .where({ id, user_id: userId })

    return res.send()
  })

  app.delete(
    '/snack/:id',
    { preHandler: [authentication] },
    async (req, res) => {
      const getParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getParamsSchema.parse(req.params)

      const { id: userId } = req.user

      await knex('snacks').delete().where({ id, user_id: userId })

      return res.send()
    },
  )

  app.get('/snacks', { preHandler: [authentication] }, async (req, res) => {
    const { id } = req.user

    const transactions = await knex('snacks').select().where({ user_id: id })

    return res.send(transactions)
  })

  app.get('/snacks/:id', { preHandler: [authentication] }, async (req, res) => {
    const { id: userId } = req.user

    const getParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getParamsSchema.parse(req.params)

    const snacks = await knex('snacks')
      .select()
      .where({ user_id: userId, id })
      .first()

    console.log('snacks')
    if (!snacks) {
      throw new AppError('Not found.', 402)
    }

    return res.send(snacks)
  })

  // app.get('/snacks/all', async (req, res) => {
  //   const transactions = await knex('users').select()

  //   return res.send(transactions)
  // })
}
