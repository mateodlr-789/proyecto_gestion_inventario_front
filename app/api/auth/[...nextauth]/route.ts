import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { http } from "@/app/_hooks/axios";

export type ErrorAuth = {
  originalStatus: number;
  message: string;
  cause: string;
};

const getError = ({ originalStatus, message, cause }: ErrorAuth) => {
  throw new Error(JSON.stringify({ originalStatus, message, cause }), {
    cause,
  });
};

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "user",
      credentials: {
        correo: { label: "user", type: "text" },
        contrasena: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        try {
          const response = await http("USUARIO").post(`/login`, {
            email: credentials?.correo ?? "",
            password: credentials?.contrasena ?? "",
          });

          if (response?.status === 200) {
            return response?.data as any;
          }

          if (response?.status === 401) {
            return getError({
              cause: "unauthorized-user-current-state",
              message: response?.data?.message ?? "",
              originalStatus: response.status,
            });
          }

          if (response?.status === 404) {
            return getError({
              cause: "not-found-user",
              message: response?.data?.message ?? "",
              originalStatus: response.status,
            });
          }

          return null;
        } catch (error: any) {
          console.error("error", error);

          throw new Error(error?.message ?? "");
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.tokenHeader = user?.token ?? "";
      }
      return token;
    },
    session: ({ session, token }) => {
      const { tokenHeader = "" } = token;

      if (session && session.user) {
        session.user.name = session?.user?.image ?? null;
      }
      return Promise.resolve({
        ...session,
        token: {
          header: tokenHeader
        },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
