import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const app = new Hono()

app.post('/', async (c) => {
  // Todo add zod validation here
  const body: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  } = await c.req.json()
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  console.log(body)

  const response = await prisma.user.create({
    data: {
      username: "tabish@test.com",
      password: "123456",
      firstName: "Tabish",
      lastName: "Khaqan"
    }
  })
  
  console.log(JSON.stringify(response))

  return Response.json(response)
})

export default app