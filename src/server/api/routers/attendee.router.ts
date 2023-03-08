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
            async ({ input, ctx }) => ctx.prisma.attendee.findFirstOrThrow({
                where: { id: input },
                include: { event: true }
            })
        ),

    addContactAsAttendee: protectedProcedure
        .input(
            z.object({
                contactId: z.string(),
                eventId: z.string()
            })
        ).mutation(
            async ({ input, ctx }) => {
                const contact = await ctx.prisma.contact.findUniqueOrThrow({
                    where: { id: input.contactId }
                })
                return ctx.prisma.attendee.create({
                    data: {
                        eventId: input.eventId,
                        email: contact.email,
                        name: contact.name
                    }
                })
            }
        ),

    removeAttendeeById: protectedProcedure
        .input(z.string())
        .mutation(
            async ({ input, ctx }) => ctx.prisma.attendee.delete({
                where: { id: input }
            })
        )
});