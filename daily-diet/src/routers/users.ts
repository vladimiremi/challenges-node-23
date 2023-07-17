import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { hash, compare } from 'bcrypt'
import { AppError } from '../utils/errors'
import { sign } from 'jsonwebtoken'
import { authentication } from '../middlewares/authentication'

export async function users(app: FastifyInstance) {
  app.post('/user', async (req, res) => {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createBodySchema.parse(req.body)

    const passwordHash = await hash(password, 8)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: passwordHash,
    })

    return res.status(201).send()
  })

  app.post('/user/session', async (req, res) => {
    const createBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = createBodySchema.parse(req.body)

    const user = await knex('users').select().where({ email }).first()

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, 'mimi', {
      subject: user.id,
      expiresIn: '1d',
    })

    res.cookie('token', `Bearer ${token}`, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  })

  app.get('/users', async (req, res) => {
    const users = await knex('users').select()

    return res.send(users)
  })

  app.get(
    '/users/metrics',
    { preHandler: [authentication] },
    async (req, res) => {
      const { id } = req.user
      const totalSnacks = await knex('snacks')
        .select()
        .where({ user_id: id })
        .count('id', { as: 'total' })
        .first()

      const totalSnacksInDiet = await knex('snacks')
        .select()
        .where({ user_id: id, is_diet: true })
        .count('id', { as: 'total' })
        .first()

      const totalSnacksOutDiet = await knex('snacks')
        .select()
        .where({ user_id: id, is_diet: false })
        .count('id', { as: 'total' })
        .first()

      const snacks = await knex('snacks')
        .select()
        .where({ user_id: id })
        .orderBy('created_at', 'asc')

      let currentSequence = 0
      let bestSequence = 0
      let currentPosition = 0

      for (const snack of snacks) {
        if (snack.is_diet) {
          currentSequence++
        } else {
          bestSequence =
            currentSequence > bestSequence ? currentSequence : bestSequence
          currentSequence = 0
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        currentPosition++
      }

      bestSequence =
        currentSequence > bestSequence ? currentSequence : bestSequence

      return res.send({
        totalSnacks: totalSnacks?.total,
        totalSnacksInDiet: totalSnacksInDiet?.total,
        totalSnacksOutDiet: totalSnacksOutDiet?.total,
        bestSequence,
      })
    },
  )
}
