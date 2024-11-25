-- CreateTable
CREATE TABLE "friends" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "date_of_birth" DATETIME NOT NULL,
    "last_processed_at" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_email_key" ON "friends"("email");

-- CreateIndex
CREATE INDEX "friends_last_processed_at_idx" ON "friends"("last_processed_at");

-- CreateIndex
CREATE INDEX "friends_date_of_birth_idx" ON "friends"("date_of_birth");

-- CreateIndex
CREATE INDEX "friends_email_idx" ON "friends"("email");
