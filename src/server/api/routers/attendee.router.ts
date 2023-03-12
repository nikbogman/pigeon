import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const attendeeRouter = createTRPCRouter({
    updateStatusById: publicProcedure
        .input(
            z.object({
                id: z.string(),
                status: z.enum(['YES', 'MAYBE', 'NO'])
            })
        )
        .mutation(
            async ({ input, ctx }) => ctx.prisma.attendee.update({
                where: { id: input.id },
                data: { status: input.status }
            })
        ),

    getByIdIncludingEvent: publicProcedure
        .input(z.string())
        .query(
            async ({ input, ctx }) => {
                try {
                    const record = await ctx.prisma.attendee.findFirstOrThrow({
                        where: { id: input },
                        include: { event: true }
                    });
                    return record;
                } catch (err) {
                    if (err instanceof Prisma.PrismaClientKnownRequestError) {
                        if (err.code === 'P2025') throw new TRPCError({
                            code: 'NOT_FOUND',
                            message: err.message,
                        });
                    }
                }
            }
        ),

    add: protectedProcedure
        .input(
            z.object({
                contactId: z.string(),
                eventId: z.string()
            })
        ).mutation(
            async ({ input, ctx }) => ctx.prisma.attendee.create({
                data: input
            })
        ),

    remove: protectedProcedure
        .input(
            z.object({
                contactId: z.string(),
                eventId: z.string()
            })
        )
        .mutation(
            async ({ input, ctx }) => ctx.prisma.attendee.delete({
                where: { contactId_eventId: input }
            })
        )
});