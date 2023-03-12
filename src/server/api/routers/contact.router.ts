import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const contactRouter = createTRPCRouter({
    add: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string()
            })
        ).mutation(
            async ({ input, ctx }) => {
                try {
                    const record = await ctx.prisma.contact.create({
                        data: {
                            userId: ctx.session.user.id,
                            email: input.email,
                            name: input.name
                        }
                    })
                    return record;
                } catch (err) {
                    if (err instanceof Prisma.PrismaClientKnownRequestError) {
                        if (err.code === 'P2002') throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: err.message,
                        });
                    }
                }
            }
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
            async ({ input, ctx }) => {
                try {
                    const record = await ctx.prisma.contact.update({
                        where: { id: input.id },
                        data: { ...input.update }
                    });
                    return record;
                } catch (err) {
                    if (err instanceof Prisma.PrismaClientKnownRequestError) {
                        if (err.code === 'P2002') throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: err.message,
                        });
                    }
                }
            }
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