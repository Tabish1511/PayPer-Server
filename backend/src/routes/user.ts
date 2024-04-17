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
    },
    Variables: {
        userId: number;
    }
}>();

// MIDDLEWARE BELOW ===========================

userRouter.use('/', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

    console.log('first line passed', jwt);

    const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    console.log(payload.id);    // <<== GET ID OF USER LOGGED-IN FROM THE JWT_TOKEN
    
    c.set('userId', payload.id);
    await next()
})

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

// GET CURRENT LOGGED IN USER FIRSTNAME =============================================
userRouter.get('/getUser', async (c) => {
    try{
        console.log(c.get('userId'));
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const user = await prisma.user.findFirst({
            where: {
                id: c.get('userId')
            }
        })
        if(!user){
            c.status(403);
            return c.json({
                message: "User not found"
            });
        }
        c.status(200);
        return c.json({
            user: {
                name: user.firstName
            }
        })
    }catch(err){
        console.error("An error occurred fetching signed in user", err);
    }

})