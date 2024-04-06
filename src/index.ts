import { Hono, Next } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

app.use('/api/*', cors())



// SIGNUP FOR THE FIRST TIME =============================================
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
            c.status(404);
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
        )
        return c.text('signup complete!');
    }
    }catch(err){
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
