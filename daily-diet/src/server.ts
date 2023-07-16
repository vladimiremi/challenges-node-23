import fastify from 'fastify'
import { users } from './routers/users'
const PORT = 3333

const app = fastify()

app.register(users)

app.listen(
  {
    port: PORT,
  },
  () => console.log('😎 Server running in PORT ' + PORT + ' 😎'),
)
