import fastify from 'fastify'
import { users } from './routers/users'
import cookie from '@fastify/cookie'
import { snacks } from './routers/snacks'

const PORT = 3333

const app = fastify()

app.register(cookie)

app.register(users)
app.register(snacks)

app.listen(
  {
    port: PORT,
  },
  () => console.log('😎 Server running in PORT ' + PORT + ' 😎'),
)
