import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

app.post('/api/v1/signup', async (c) => {
    try{
        const body: {
            username: string;
            password: string;
            firstName: string;
            lastName: string
          } = await c.req.json()

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        console.log(body);

        const isUser = await prisma.user.findFirst({
            where: {
                username: body.username
            }
        })
        if(isUser){
            return c.json({
                message: "Email already taken / Incorrect inputs"
            });
        }else{
            const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName
            }}
        )}

        return c.text('signup route')
    }catch{
        return c.text('signup failed')
    }
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.post('/api/v1/create', (c) => {
	return c.text('get create route')
})

app.put('/api/v1/edit', (c) => {
	return c.text('get edit route')
})

app.patch('/api/v1/paid', (c) => {
	return c.text('get paid route')
})

app.delete('/api/v1/delete', (c) => {
	return c.text('get delete route')
})

app.get('/api/v1/bulk', (c) => {
	return c.text('get bulk route')
})

app.get('/api/v1/single', (c) => {
	return c.text('get single route')
})

export default app;









// app.post('/api/v1/blog/:id', (c) => {
// 	const id = c.req.param('id')
// 	console.log(id);
// 	return c.text('get blog route')
// })

// app.post('/api/v1/blog', (c) => {

// 	return c.text('signin route')
// })

// app.get('/api/v1/blog', (c) => {
// 	return c.text('signin route')
// })

// app.put('/api/v1/blog', (c) => {
// 	return c.text('signin route')
// })

// app.get('/api/v1/blog/bulk', (c) => {
// 	return c.text('signin route')
// })





























// import { Hono, Next } from 'hono'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { env } from 'hono/adapter'

// const app = new Hono()

// app.post('/', async (c) => {
//   // Todo add zod validation here
//   const body: {
//     username: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//   } = await c.req.json()
//   const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

//   const prisma = new PrismaClient({
//       datasourceUrl: DATABASE_URL,
//   }).$extends(withAccelerate())

//   console.log(body)

//   const response = await prisma.user.create({
//     data: {
//       username: "tabish@test.com",
//       password: "123456",
//       firstName: "Tabish",
//       lastName: "Khaqan"
//     }
//   })
  
//   console.log(JSON.stringify(response))

//   return Response.json(response)
// })

// export default app