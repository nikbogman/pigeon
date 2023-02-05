import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const guestRouter = createTRPCRouter({
    updateAttendanceById: publicProcedure
        .input(
            z.object({
                id: z.string(),
                attending: z.boolean()
            })
        )
        .mutation(async ({ input, ctx }) => {
            return ctx.prisma.guest.update({
                where: {
                    id: input.id
                },
                data: {
                    attending: input.attending
                }
            })
        }),
    getByIdAndInvitation: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            return ctx.prisma.guest.findFirstOrThrow({
                where: {
                    id: input,
                },
                include: {
                    invitation: true
                }
            })
        })
});