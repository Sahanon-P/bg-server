-- CreateTable
CREATE TABLE "Boardgames" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "maxPlayer" INTEGER NOT NULL,
    "minPlayer" INTEGER NOT NULL,
    "minTime" INTEGER NOT NULL,
    "maxTime" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "yearPublish" TEXT NOT NULL,
    "rating" INTEGER,

    CONSTRAINT "Boardgames_pkey" PRIMARY KEY ("id")
);
