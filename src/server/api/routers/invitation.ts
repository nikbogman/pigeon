import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const invitationRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            title: z.string().min(2).max(20),
            description: z.string().min(5),
            date: z.date(),
            guests: z.array(z.object({
                name: z.string().min(2).max(20)
            }))
        })).mutation(async ({ input, ctx }) => {
            return ctx.prisma.invitation.create({
                data: {
                    userId: ctx.session.user.id,
                    title: input.title,
                    description: input.description,
                    date: input.date,
                    guests: {
                        create: [...input.guests]
                    }
                }
            });
        }),
    getMine: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.invitation.findMany({
            where: {
                userId: ctx.session.user.id
            },
            include: {
                _count: {
                    select: {
                        guests: true
                    }
                }
            }
        })
    }),

    getById: protectedProcedure
        .input(z.string())
        .query(({ input, ctx }) => {
            return ctx.prisma.invitation.findUniqueOrThrow({
                where: { id: input },
                include: {
                    guests: {
                        select: {
                            name: true,
                            attending: true
                        }
                    }
                }
            })
        }),

    deleteById: protectedProcedure
        .input(z.string())
        .mutation(({ input, ctx }) => {
            return ctx.prisma.invitation.deleteMany({
                where: { id: input, userId: ctx.session.user.id }
            })
        }),
    changeAttendance: publicProcedure
        .input(z.string())
        .mutation(({ input, ctx }) => {
            return ctx.prisma.guest.update({
                where: { id: input },
                data: { attending: true }
            })
        }),

    getAsGuest: publicProcedure
        .input(z.object({
            guestId: z.string(),
            invitationId: z.string()
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.guest.findFirstOrThrow({
                where: {
                    id: input.guestId,
                    invitationId: input.invitationId
                },
                include: {
                    invitation: true
                }
            })
        })
});