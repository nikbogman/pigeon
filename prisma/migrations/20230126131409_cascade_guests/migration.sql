-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "invitationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("invitationId", "name"),
    CONSTRAINT "Guest_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guest" ("attending", "invitationId", "name") SELECT "attending", "invitationId", "name" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
