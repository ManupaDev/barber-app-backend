/*
  Warnings:

  - You are about to drop the column `availabilityId` on the `Slot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_availabilityId_fkey";

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "slots" INTEGER[];

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "availabilityId";
