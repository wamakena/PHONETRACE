"use server";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Neon query returns array of rows
          const users = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
          if (!users || users.length === 0) return null;

          const user = users[0];

          // bcrypt compare password
          const isValid = await bcrypt.compare(credentials.password, user.password_hash);
          if (!isValid) return null;

          return { id: user.id, name: user.name, email: user.email, role: user.role };
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.sub; // include user id
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // optional: custom login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
