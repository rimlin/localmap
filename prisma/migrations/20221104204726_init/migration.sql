-- create postgis extension
-- CREATE EXTENSION postgis;

-- CreateTable
CREATE TABLE "marker" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coords" geometry(Point, 4326) NOT NULL,

    CONSTRAINT "marker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "location_idx" ON "marker" USING GIST ("coords");
