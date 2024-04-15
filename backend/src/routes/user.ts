import { Hono } from "hono";
import { cors } from 'hono/cors'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupBody, signinBody } from "@tabishkhaqan/payper-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

// SIGNUP FOR THE FIRST TIME =============================================
userRouter.post('/signup', async (c) => {
    try{
        const body: {
            username: string;
            password: string;
            firstName: string;
            lastName: string
          } = await c.req.json()

        const { success } = signupBody.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Incorrect inputs"
            })
        }

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
            c.status(411);
            return c.json({
                message: "Email already taken / Incorrect inputs"
            });
        }
        
        const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName
        }});
        
        const jwt = await sign({
            id: user.id   
        }, c.env.JWT_SECRET)

        return c.json({
            token: jwt
        })
    }catch(err){
        return c.text('signup failed')
    }
})

// SIGNIN FOR EXISTING USER ================================================
userRouter.post('/signin', async (c) => {
	try{
        const body: {
            username: string;
            password: string;
          } = await c.req.json()

        const { success } = signinBody.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Incorrect inputs"
            })
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        console.log(body);

        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            }
        })
        
        if(!user){
            c.status(403);
            return c.json({
                message: "Incorrect creds"
            });
        }
        
        const jwt = await sign({
            id: user.id   
        }, c.env.JWT_SECRET)

        return c.json({
            token: jwt
        })
    }catch(err){
        return c.text('signin failed')
    }
})