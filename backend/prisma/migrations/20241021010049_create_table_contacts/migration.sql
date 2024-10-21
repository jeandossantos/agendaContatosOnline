-- CreateTable
CREATE TABLE "contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone_number" TEXT NOT NULL,
    "phone_number_2" TEXT,
    "email" TEXT NOT NULL,
    "email_2" TEXT,
    "address" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
