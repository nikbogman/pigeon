/*
  Warnings:

  - The primary key for the `Guest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Guest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "invitationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Guest_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guest" ("attending", "invitationId", "name") SELECT "attending", "invitationId", "name" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
