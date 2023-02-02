import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import * as guestsService from "../../../lib/guests.service";
import * as invitationsService from "../../../lib/invitations.service";
import { DocumentData } from "firebase/firestore";

export const invitationRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                title: z.string().min(2).max(20),
                description: z.string().min(5),
                date: z.date(),
                guests: z.array(
                    z.object({
                        name: z.string().min(2).max(20)
                    })
                )
            })
        ).mutation(async ({ input, ctx }) => {
            const doc = await invitationsService.create({
                userId: ctx.session.user.id,
                title: input.title,
                description: input.description,
                date: input.date,
            });

            const guestIds: string[] = [];
            for (const { name } of input.guests) {
                const { id } = await guestsService.create({
                    invitationId: doc.id,
                    name,
                    attending: false
                });
                guestIds.push(id);
            }

            await invitationsService.updateById(doc.id, { guests: guestIds });
            return doc;
        }),
    getAllWithGuestCount: protectedProcedure
        .query(async ({ ctx }) => {
            const snapshot = await invitationsService.findManyWhere("userId", "==", ctx.session.user.id);
            const response: DocumentData & { date?: Date; guestCount?: number } = [];
            for (const doc of snapshot) {
                const guestCount = await guestsService.countWhere("invitationId", "==", doc.id);
                response.push({
                    ...doc,
                    guestCount,
                    date: doc.date.toDate() satisfies Date,
                });
            }
            return response;
        }),
    getByIdWithGuests: protectedProcedure
        .input(z.string())
        .query(async ({ input }) => {
            const doc = await invitationsService.findById(input);
            const snapshot = await guestsService.findManyWhere("invitationId", "==", doc.id);
            return {
                ...doc,
                date: doc.date.toDate() satisfies Date,
                guests: snapshot
            }
        }),
    removeById: protectedProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            return invitationsService.deleteById(input);
        }),
});