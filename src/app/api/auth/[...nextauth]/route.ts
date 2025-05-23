import { USER } from "@/types/userType";
import NextAuth, { Session, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const credDetails = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const resp = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credDetails),
        });

        if (!resp.ok) {
          const errorData = await resp.json();
          throw new Error(errorData?.error || "Login failed");
        }
        const user = await resp.json();
        if (user) {
          return user.user;
        } else {
          return null;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
