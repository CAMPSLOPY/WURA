import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client"; // Correct import
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Initialize Prisma client
const prismadb = new PrismaClient();

export default NextAuth({
  providers: [
GithubProvider({

  clientId: process.env.GITHUB_ID || '',
  clientSecret: process.env.GITHUB_SECRET || ''
}),
GoogleProvider({

  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
}),


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

callbacks: {
  async session({ session, user, token }) {
    session.user = token;
    return session
  },
  async jwt({ token, user}) {

    if(user){
      token.user = user;
    }
    return token

}
},

pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt',
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET || 'default_secret', 
  // },
  secret: process.env.NEXTAUTH_SECRET || 'default_secret', 
});
