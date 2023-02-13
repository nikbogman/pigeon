import { z } from "zod";
import { env } from "../../../env/server.mjs";
import generateQrCode from "../../../lib/generateQrCode";
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
            const invitation = await ctx.prisma.invitation.findUniqueOrThrow({
                where: {
                    id: input
                },
                include: {
                    guests: true
                }
            })
            const guests = [];
            for (const guest of invitation.guests) {
                guests.push({
                    ...guest,
                    dataUrl: await generateQrCode(guest.id),
                    url: `${env.NEXTAUTH_URL}guests/${guest.id}`
                })
            }
            return { ...invitation, guests }
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