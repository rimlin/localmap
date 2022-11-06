/*
  Warnings:

  - You are about to drop the column `markerGroupId` on the `marker` table. All the data in the column will be lost.
  - Added the required column `marker_group_id` to the `marker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "marker" DROP CONSTRAINT "marker_markerGroupId_fkey";

-- AlterTable
ALTER TABLE "marker" DROP COLUMN "markerGroupId",
ADD COLUMN     "marker_group_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "marker" ADD CONSTRAINT "marker_marker_group_id_fkey" FOREIGN KEY ("marker_group_id") REFERENCES "MarkerGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
