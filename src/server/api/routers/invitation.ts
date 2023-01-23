import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const invitationRouter = createTRPCRouter({

    getGuestinvitation: publicProcedure.query(() => {

    }),

    getMyInvitations: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),

    createInvitation: protectedProcedure.mutation(() => {
        return "you can now see this secret message!";
    })
});
