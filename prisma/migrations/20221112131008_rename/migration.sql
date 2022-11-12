/*
  Warnings:

  - You are about to drop the `MarkerGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `marker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "marker" DROP CONSTRAINT "marker_marker_group_id_fkey";

-- DropTable
DROP TABLE "MarkerGroup";

-- DropTable
DROP TABLE "marker";

-- CreateTable
CREATE TABLE "place" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" geometry(Point, 4326) NOT NULL,
    "placesGroupId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacesGroup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "PlacesGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "location_idx" ON "place" USING GIST ("location");

-- AddForeignKey
ALTER TABLE "place" ADD CONSTRAINT "place_placesGroupId_fkey" FOREIGN KEY ("placesGroupId") REFERENCES "PlacesGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
