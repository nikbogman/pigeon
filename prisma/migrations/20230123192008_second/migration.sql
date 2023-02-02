/*
  Warnings:

  - You are about to drop the `Invtivation` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Guest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `invtivationId` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `invitationId` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Invtivation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Invitation" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "invitationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("invitationId", "name"),
    CONSTRAINT "Guest_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guest" ("attending", "name") SELECT "attending", "name" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
