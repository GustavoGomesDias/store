-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clothes_id" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_clothes_id_fkey" FOREIGN KEY ("clothes_id") REFERENCES "clothes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
