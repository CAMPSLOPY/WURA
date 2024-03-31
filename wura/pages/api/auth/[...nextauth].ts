import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client"; // Correct import
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt';


// Initialize Prisma client
const prismadb = new PrismaClient();

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email", 
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }
          const user = await prismadb.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.hashedPassword) {
            throw new Error("Invalid credentials");
          }

          const isCorrectPassword = await compare(
            credentials.password,
            user.hashedPassword
          );
          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }

          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET || 'default_secret', 
  },
  secret: process.env.NEXTAUTH_SECRET || 'default_secret', 
});
