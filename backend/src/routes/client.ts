import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { newClientBody, updatedClientBody } from "@tabishkhaqan/payper-common";

import { Resend } from 'resend';

export const clientRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        RESEND_API_KEY: string;
    },
    Variables: {
        userId: number;
    }
}>();

// MIDDLEWARE BELOW ===========================

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
        total: number;
        deposit: number;
        months: number;
      } = await c.req.json();
      console.log("Check response below");
      console.log(body);
    const newDate = new Date(); // USE THIS METHOD FOR TODAY'S DATE AND TIME NOW!!!

    const { success } = newClientBody.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Incorrect client details"
        })
    }

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
                total: body.total, 
                deposit: body.deposit,
                months: body.months,
                dueDate: newDate,
                userId: c.get('userId')
            }
        })

        // GET USER OF ACCOUNT ===========================
        const user = await prisma.user.findFirst({
            where: {
                id: c.get('userId')
            }
        })
        if (!user || !user.username) {
            console.log("User not found or username is undefined");
            return;
        }
        // ===============================================

        // EMAIL SENT BELOW ==============================
        try{
            const resend = new Resend(c.env.RESEND_API_KEY);
            const data = await resend.emails.send({
                from: 'PayPer <onboarding@resend.dev>',
                to: user.username,
                subject: 'Hello World',
                html: `<strong>
                New client created, ${client.name}:<br>
                Item: ${client.itemDescription}<br>
                Phone: ${client.phone}<br>
                Total: ${client.total}<br>
                Deposit: ${client.deposit}<br>
                Months: ${client.months}<br>
                Due date: ${client.dueDate}<br>
                </strong>`
            });
        }catch(emailError){
            c.status(403);
            return c.json({
                "message": "Email sending error",
                "error": emailError
            })
        }// END OF EMAIL BLOCK ============================

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
        total: number;
        deposit: number;
        months: number;
      } = await c.req.json()
    console.log(body);  // <<== DELETE THIS LINE AFTER TESTING
    const newDate = new Date(); // USE THIS METHOD FOR TODAY'S DATE AND TIME NOW!!!
	
    const { success } = updatedClientBody.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Incorrect client details"
        })
    }

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
            total: body.total, 
            deposit: body.deposit, 
            months: body.months, 
            dueDate: newDate
        }
      })

      // GET USER OF ACCOUNT ===========================
      const user = await prisma.user.findFirst({
        where: {
            id: c.get('userId')
        }
      })
      if (!user || !user.username) {
        console.log("User not found or username is undefined");
        return;
      }
      // ===============================================

      // EMAIL SENT BELOW ==============================
      try{
        const resend = new Resend(c.env.RESEND_API_KEY);
        const data = await resend.emails.send({
            from: 'PayPer <onboarding@resend.dev>',
            to: user.username,
            subject: 'Hello World',
            html: `<strong>
            The following changes made to client, ${updatedClient.name}:<br>
            Item: ${updatedClient.itemDescription}<br>
            Phone: ${updatedClient.phone}<br>
            Total: ${updatedClient.total}<br>
            Deposit: ${updatedClient.deposit}<br>
            Months: ${updatedClient.months}<br>
            Due date: ${updatedClient.dueDate}<br>
            </strong>`
        });
      }catch(emailError){
        c.status(403);
        return c.json({
            "message": "Email sending error",
            "error": emailError
        })
      }// END OF EMAIL BLOCK ============================


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
    const id = c.get('userId');

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

      // GET USER OF ACCOUNT ===========================
      const user = await prisma.user.findFirst({
        where: {
            id: c.get('userId')
        }
      })
      if (!user || !user.username) {
        console.log("User not found or username is undefined");
        return;
      }
      // ===============================================

      // EMAIL SENT BELOW ==============================
      try{
        const resend = new Resend(c.env.RESEND_API_KEY);
        const data = await resend.emails.send({
            from: 'PayPer <onboarding@resend.dev>',
            to: user.username,
            subject: 'Hello World',
            html: `<strong>Payment recieved from ${client.name}</strong>`
        });
      }catch(emailError){
        c.status(403);
        return c.json({
            "message": "Email sending error",
            "error": emailError
        })
      }// END OF EMAIL BLOCK ============================
      
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

    console.log(deletedClient.name);

    // GET USER OF ACCOUNT ===========================
    const user = await prisma.user.findFirst({
        where: {
            id: c.get('userId')
        }
      })
      if (!user || !user.username) {
        console.log("User not found or username is undefined");
        return;
      }
      // ===============================================

    // EMAIL SENT BELOW ==============================
    try{
        const resend = new Resend(c.env.RESEND_API_KEY);
        const data = await resend.emails.send({
            from: 'PayPer <onboarding@resend.dev>',
            to: user.username,
            subject: 'Hello World',
            html: `<strong>Client deleted, ${deletedClient.name}</strong>`
        });
      }catch(emailError){
        c.status(403);
        return c.json({
            "message": "Email sending error",
            "error": emailError
        })
      }// END OF EMAIL BLOCK ============================

    }catch(err){
        c.status(403)
        return c.json({"error": err});
    }
    
    c.status(200)
    return c.json({
        message: "Client successfully deleted."
    })
})