/*
  Warnings:

  - Added the required column `markerGroupId` to the `marker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "marker" ADD COLUMN     "markerGroupId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MarkerGroup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "MarkerGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "marker" ADD CONSTRAINT "marker_markerGroupId_fkey" FOREIGN KEY ("markerGroupId") REFERENCES "MarkerGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
