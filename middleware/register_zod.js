import {z} from 'zod';

 const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(150, "Email too long"),

  role: z
    .string()
    .max(20)
    .default("user"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255)
});

export function Validate_User(data){
     return userSchema.safeParse(data)
}