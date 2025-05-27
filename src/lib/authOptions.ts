import CredentialsProvider from "next-auth/providers/credentials";

import { USER } from "@/types/userType";
import { Session, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { authenticateUser } from "./authenticate";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { type: "email", required: true },
        password: { type: "password", required: true },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const resp = await authenticateUser(
            credentials?.email,
            credentials?.password
          );

          if (resp) {
            return resp;
          } else {
            return null;
          }
        } catch (error) {
          const err = error as Error;
          console.error("Authorize error:", err.message);
          throw new Error(err.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/todo",
    error: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 300,
  },
  jwt: {
    maxAge: 300,
  },
  debug: true,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: USER }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.email = token.email as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
