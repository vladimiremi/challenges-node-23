import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { hash, compare } from 'bcrypt'
import { AppError } from '../utils/errors'
import { sign } from 'jsonwebtoken'

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

  app.post('/user/session', async (req, res) => {
    const createTransactionBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = createTransactionBodySchema.parse(req.body)

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
}
