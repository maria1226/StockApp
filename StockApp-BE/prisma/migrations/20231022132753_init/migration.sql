-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);
