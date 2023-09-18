-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "independency" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "environment" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
