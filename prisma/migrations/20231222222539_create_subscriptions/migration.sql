-- CreateTable
CREATE TABLE "subscriptons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptons_user_id_key" ON "subscriptons"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptons_price_id_key" ON "subscriptons"("price_id");
