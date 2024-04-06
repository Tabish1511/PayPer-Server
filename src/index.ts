import { Hono, Next } from 'hono'
import { userRouter } from './routes/user'
import { clientRouter } from './routes/client'
import { cors } from 'hono/cors'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

app.use('/api/*', cors())
app.route('api/v1/user', userRouter);
app.route('api/v1/client', clientRouter);

export default app;
