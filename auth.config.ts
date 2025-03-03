import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          if (!credentials.email || typeof credentials.email !== "string") {
            return null;
          }
          if (
            !credentials.password ||
            typeof credentials.password !== "string"
          ) {
            return null;
          }
          // logic to verify if the user exists
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            return null;
          }
          if (!(await bcrypt.compare(credentials.password, user.password))) {
            return null;
          }

          // return user object with their profile data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          } else {
            return null;
          }
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
