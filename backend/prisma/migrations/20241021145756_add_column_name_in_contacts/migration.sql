/*
  Warnings:

  - Added the required column `name` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "phone_number_2" TEXT,
    "email" TEXT NOT NULL,
    "email_2" TEXT,
    "address" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contacts" ("address", "email", "email_2", "id", "phone_number", "phone_number_2", "user_id") SELECT "address", "email", "email_2", "id", "phone_number", "phone_number_2", "user_id" FROM "contacts";
DROP TABLE "contacts";
ALTER TABLE "new_contacts" RENAME TO "contacts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
