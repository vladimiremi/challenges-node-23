import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '../utils/errors'
import { knex } from '../database'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.cookies.token

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, 'mimi') as IPayload

    const user = await knex('users').select().where({ id: userId }).first()

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    request.user = {
      id: userId,
    }
  } catch (error) {
    throw new AppError('Invali Token!', 401)
  }
}
