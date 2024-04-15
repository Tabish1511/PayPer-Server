import z from "zod";

// ZOD VALIDATIONS FOR USERS =====================
export const signupBody = z.object({
    username: z.string().email(),
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	password: z.string().min(6)
});

export const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(6)
});

// ZOD VALIDATIONS FOR CLIENTS =====================

export const newClientBody = z.object({
    name: z.string(),
	itemDescription: z.string(),
	phone: z.string(),
	totalAmount: z.number(),
    deposit: z.number(),
    months: z.number(),
    newDate: z.date()
});

export const updatedClientBody = z.object({
    name: z.string().optional(),
    itemDescription: z.string().optional(),
    phone: z.string().optional(),
    totalAmount: z.number().optional(),
    deposit: z.number().optional(),
    months: z.number().optional(),
    newDate: z.date().optional()
});

// TYPE INFERENCES FOR THE FRONTEND =====================

export type SignupInput = z.infer<typeof signinBody>
export type SigninBody = z.infer<typeof signinBody>
export type NewClientBody = z.infer<typeof newClientBody>
export type UpdatedClientBody = z.infer<typeof updatedClientBody>