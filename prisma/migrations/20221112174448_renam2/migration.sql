/*
  Warnings:

  - You are about to drop the column `placesGroupId` on the `place` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "place" DROP CONSTRAINT "place_placesGroupId_fkey";

-- AlterTable
ALTER TABLE "place" DROP COLUMN "placesGroupId",
ADD COLUMN     "places_group_id" TEXT;

-- AddForeignKey
ALTER TABLE "place" ADD CONSTRAINT "place_places_group_id_fkey" FOREIGN KEY ("places_group_id") REFERENCES "PlacesGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
