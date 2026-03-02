import {z} from 'zod';

 const userSchema = z.object({
  user_email: z
    .string()
    .email("Invalid email format")
    .max(150, "Email too long"),

  user_role: z
    .string()
    .max(20)
    .default("user"),

  user_password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255)
});

export function Validate_User(data){
     return userSchema.safeParse(data)
}