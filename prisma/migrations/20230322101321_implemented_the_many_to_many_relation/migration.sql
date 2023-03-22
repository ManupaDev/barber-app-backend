/*
  Warnings:

  - You are about to drop the column `slots` on the `Availability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "slots";

-- CreateTable
CREATE TABLE "SlotsOnAvailabilities" (
    "slotId" INTEGER NOT NULL,
    "availabilityId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "SlotsOnAvailabilities_pkey" PRIMARY KEY ("slotId","availabilityId")
);

-- AddForeignKey
ALTER TABLE "SlotsOnAvailabilities" ADD CONSTRAINT "SlotsOnAvailabilities_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotsOnAvailabilities" ADD CONSTRAINT "SlotsOnAvailabilities_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
