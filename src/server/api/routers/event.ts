import { Event, Attendee } from "@prisma/client";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import generateQrCode from "../../../lib/generateQrCode";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                title: z.string().min(2).max(20),
                description: z.string().min(5),
                date: z.date(),
                attendees: z.object({
                    name: z.string(),
                    email: z.string()
                }).array()
            })
        ).mutation(
            async ({ input, ctx }) => ctx.prisma.event.create({
                data: {
                    userId: ctx.session.user.id,
                    title: input.title,
                    description: input.description,
                    date: input.date,
                    attendees: {
                        create: [...input.attendees]
                    }
                }
            })
        ),

    getAllIncludingAttendeesCount: protectedProcedure
        .query(
            async ({ ctx }) => {
                return ctx.prisma.event.findMany({
                    where: { userId: ctx.session.user.id },
                    include: {
                        _count: {
                            select: {
                                attendees: true
                            }
                        }
                    }
                })

            }
        ),

    getByIdIncludingAttendees: protectedProcedure
        .input(z.string())
        .query(
            async ({ input, ctx }) => {
                const event: Event & {
                    attendees: Attendee[];
                } = await ctx.prisma.event.findUniqueOrThrow({
                    where: { id: input },
                    include: {
                        attendees: true
                    }
                })
                const attendees: Array<Attendee & {
                    dataUrl: string;
                    url: string
                }> = new Array();
                event.attendees.forEach(async attendee => attendees.push({
                    ...attendee,
                    dataUrl: await generateQrCode(attendee.id),
                    url: `${env.NEXTAUTH_URL}attendee/${attendee.id}`
                }))
                return {
                    ...event,
                    attendees
                }
            }
        ),

    removeById: protectedProcedure
        .input(z.string())
        .mutation(
            async ({ input, ctx }) => ctx.prisma.event.deleteMany({
                where: {
                    id: input,
                    userId: ctx.session.user.id
                }
            })
        ),

});