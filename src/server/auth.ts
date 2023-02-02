import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { type GetServerSidePropsContext } from "next";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { env } from "../env/server.mjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: FirestoreAdapter({
    apiKey: "AIzaSyA44ASFl-TVfuNXNJp4esNP1FEsKmGkGgI",
    authDomain: "pigeon-77ca9.firebaseapp.com",
    projectId: "pigeon-77ca9",
    storageBucket: "pigeon-77ca9.appspot.com",
    messagingSenderId: "335495812325",
    appId: "1:335495812325:web:033c4799c26e1c1fc0300c",
    measurementId: "G-6M0HBTPG99"
  }),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signIn'
  },
  theme: {
    colorScheme: "light",
  }
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
