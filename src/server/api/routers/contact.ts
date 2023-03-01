import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
export const contactRouter = createTRPCRouter({
    add: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string()
            })
        ).mutation(
            async ({ input, ctx }) => ctx.prisma.contact.create({
                data: {
                    userId: ctx.session.user.id,
                    email: input.email,
                    name: input.name
                }
            })
        ),

    updateById: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                update: z.object({
                    name: z.string().optional(),
                    email: z.string().optional()
                })
            })
        ).mutation(
            async ({ input, ctx }) => ctx.prisma.contact.update({
                where: { id: input.id },
                data: { ...input.update }
            })
        ),

    removeById: protectedProcedure
        .input(z.string())
        .mutation(
            async ({ input, ctx }) => ctx.prisma.contact.deleteMany({
                where: {
                    id: input,
                    userId: ctx.session.user.id
                },
            })
        ),

    getAll: protectedProcedure
        .query(
            async ({ ctx }) => ctx.prisma.contact.findMany({
                where: {
                    userId: ctx.session.user.id
                },
            })
        ),

    getById: protectedProcedure
        .input(z.string())
        .query(
            async ({ input, ctx }) => ctx.prisma.contact.findMany({
                where: {
                    id: input,
                    userId: ctx.session.user.id
                },
            })
        ),

});