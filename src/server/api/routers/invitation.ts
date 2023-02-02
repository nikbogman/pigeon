import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const invitationRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                title: z.string().min(2).max(20),
                description: z.string().min(5),
                date: z.date(),
                guests: z.array(z.object({
                    name: z.string().min(2).max(20)
                }))
            })
        ).mutation(async ({ input, ctx }) => {
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
    getAllWithGuestCount: protectedProcedure
        .query(async ({ ctx }) => {
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
    getByIdWithGuests: protectedProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            return ctx.prisma.invitation.findUniqueOrThrow({
                where: {
                    id: input
                },
                include: {
                    guests: true
                }
            })
        }),
    removeById: protectedProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            return ctx.prisma.invitation.deleteMany({
                where: {
                    id: input,
                    userId: ctx.session.user.id
                }
            })
        }),
});