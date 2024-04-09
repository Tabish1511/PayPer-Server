import { Hono } from "hono";
import { cors } from 'hono/cors'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const clientRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


// CLIENT ROUTES BELOW ===========================

clientRouter.post('/create', async (c) => {
    const body: {
        name: string;
        itemDescription: string;
        phone: string;
        totalAmount: number;
        deposit: number;
        months: number;
      } = await c.req.json()
    const newDate = new Date(); // USE THIS METHOD FOR TODAY'S DATE AND TIME NOW!!!
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log(body);
    console.log(newDate);

    const nextMonth = newDate.getMonth() + 1;
    newDate.setMonth(nextMonth);
    console.log(newDate);
    
    try{
        const client = await prisma.client.create({
            data:{
                name: body.name, 
                itemDescription: body.itemDescription, 
                phone: body.phone,
                total: body.totalAmount, 
                deposit: body.deposit,
                months: body.months,
                dueDate: newDate,
                userId: 1 //    << == CHANGE THIS WHEN ALL APIs ARE DONE
            }
        })
        console.log(client);
        c.status(200)
        
        return c.json({
            message: "Client created successfully",
        })

    }catch(err){
        c.status(403)
        return c.json(err);
    }
})





clientRouter.put('/edit', async (c) => {
    const body: {
        clientId: number;
        name: string;
        itemDescription: string;
        phone: string;
        totalAmount: number;
        deposit: number;
        months: number;
      } = await c.req.json()
    console.log(body);  // <<== DELETE THIS LINE AFTER TESTING
    const newDate = new Date(); // USE THIS METHOD FOR TODAY'S DATE AND TIME NOW!!!
	
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        // the following req.body.clientId will be passed from the react frontend '/editClient' page when the 'submit' button is pushed ie. (onclick fn)
        const client = await prisma.client.findUnique({
            where: {
            id: body.clientId
        }
      });
      if(!client){
        c.status(404)
        
        return c.json({
            message: "Client not found",
        })
      }

      const updatedClient = await prisma.client.update({
        where: {
            id: body.clientId
        },
        data: {
            name: body.name, 
            itemDescription: body.itemDescription, 
            phone: body.phone, 
            total: body.totalAmount, 
            deposit: body.deposit, 
            months: body.months, 
            dueDate: newDate
            // userId: (req as CustomRequest).userId
        }
      })
    }catch(err){
        c.status(403)
        
        return c.json({
            message: err,
        })
    }
    c.status(200)    
    return c.json({
        message: "Client created successfully",
    })
})













































clientRouter.patch('/paid', (c) => {
	return c.text('get paid route')
})

clientRouter.delete('/delete', (c) => {
	return c.text('get delete route')
})

clientRouter.get('/bulk', (c) => {
	return c.text('get bulk route')
})

clientRouter.get('/single', (c) => {
	return c.text('get single route')
})