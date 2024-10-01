-- CreateTable
CREATE TABLE "NavbarItem" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "NavbarItem_pkey" PRIMARY KEY ("id")
);
