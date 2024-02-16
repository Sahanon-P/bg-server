/*
  Warnings:

  - You are about to drop the column `maxPlayer` on the `Boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `maxTime` on the `Boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `minPlayer` on the `Boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `minTime` on the `Boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `yearPublish` on the `Boardgames` table. All the data in the column will be lost.
  - Added the required column `maxplayers` to the `Boardgames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxplaytime` to the `Boardgames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minplayers` to the `Boardgames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minplaytime` to the `Boardgames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearpublished` to the `Boardgames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boardgames" DROP COLUMN "maxPlayer",
DROP COLUMN "maxTime",
DROP COLUMN "minPlayer",
DROP COLUMN "minTime",
DROP COLUMN "yearPublish",
ADD COLUMN     "maxplayers" INTEGER NOT NULL,
ADD COLUMN     "maxplaytime" INTEGER NOT NULL,
ADD COLUMN     "minplayers" INTEGER NOT NULL,
ADD COLUMN     "minplaytime" INTEGER NOT NULL,
ADD COLUMN     "yearpublished" TEXT NOT NULL;
