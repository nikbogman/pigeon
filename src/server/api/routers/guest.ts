import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as guestsService from "../../../lib/guests.service";
import * as invitationsService from "../../../lib/invitations.service";

export const guestRouter = createTRPCRouter({
    updateAttendanceById: publicProcedure
        .input(
            z.object({
                id: z.string(),
                attending: z.boolean()
            })
        )
        .mutation(async ({ input }) => {
            return guestsService.updateById(input.id, {
                attending: input.attending
            });
        }),
    getByIdAndInvitation: publicProcedure
        .input(
            z.object({
                guestId: z.string(),
                invitationId: z.string()
            })
        )
        .query(async ({ input }) => {
            const guest = await guestsService.findById(input.guestId);
            const invitation = await invitationsService.findById(input.invitationId);
            return { ...guest, invitation }
        })
});