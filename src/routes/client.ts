import { Hono } from "hono";
import { cors } from 'hono/cors'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const clientRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: number;
    }
}>();

clientRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

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
                userId: c.get('userId') //    << == CHANGE THIS WHEN ALL APIs ARE DONE
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

clientRouter.get('/bulk', async (c) => {
    const filter = c.req.query('filter');
    const id = c.get('userId');   // <<== THIS ID NEEDS TO BE DECODED IN THE AUTHMIDDLEWARE PASSED HERE

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const clients = await prisma.client.findMany({
            where: {
              OR: [
                {
                  name: {
                    contains: filter,
                    mode: 'insensitive'
                  }
                },
                {
                  phone: {
                    contains: filter,
                    mode: 'insensitive'
                  }
                }
              ],
              userId: id
            }
        });

        c.status(200)
        return c.json({
        client: clients.map(client => ({
            id: client.id,
            name: client.name,
            itemDescription: client.itemDescription,
            phone: client.phone,
            total: client.total,
            deposit: client.deposit,
            months: client.months,
            dueDate: client.dueDate
        }))
        })
    }catch(error){
        console.error("error fetching clients (backend): ", error);
        c.status(500)
        return c.json({ error: "Internal server error" });
    }
})

clientRouter.get('/single', async (c) => {
    const idParam = c.req.query('id');
    const id = typeof idParam === 'string' ? parseInt(idParam) : NaN;

    if (isNaN(id)) {
        c.status(400)
        return c.json({"error": "Invalid id parameter"});
    }

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const client = await prisma.client.findUnique({
            where: {
            id: id
            }
          });

          if(!client){
            c.status(404)
            return c.json({"error": "Client not found"});
            }

        c.status(200);
        return c.json({
            client: {
                id: client.id,
                name: client.name,
                itemDescription: client.itemDescription,
                phone: client.phone,
                total: client.total,
                deposit: client.deposit,
                months: client.months,
                dueDate: client.dueDate
            }
        })
    }catch(error){
        c.status(403);
        return c.json({
            "error": error
        })
    }
})

clientRouter.patch('/paid', async (c) => {
    const body: {
        id: number;
      } = await c.req.json()
    console.log(body.id);

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    
    try{
        const client = await prisma.client.findUnique({
            where: {
            id: body.id
        }
      });
      if(!client){
        c.status(404)
        return c.json({"Error": "Client not found"});
      }
      
      const newDate = client.dueDate;
      const nextMonth = newDate.getMonth() + 1;
      newDate.setMonth(nextMonth);

      const updatedClient = await prisma.client.update({
        where: {
            id: body.id
        },
        data: {
            dueDate: newDate
        }
      })

      c.status(200);
      return c.json({
        "message": "Payment complete!"
      })
    }catch(err){
        c.status(403)
        return c.json({"error": err});
    }
})

clientRouter.delete('/delete', async (c) => {
    const body: {
        id: number;
      } = await c.req.json()
    
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
      const deletedClient = await prisma.client.delete({
        where: {
            id: body.id
        }
      })
      if(!deletedClient){
        c.status(404)
        return c.json({"error": "Client not found"});
      }
    }catch(err){
        c.status(403)
        return c.json({"error": err});
    }
    
    c.status(200)
    return c.json({
        message: "Client successfully deleted."
    })
})