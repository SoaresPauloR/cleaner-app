/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_id_client_fkey`;

-- DropForeignKey
ALTER TABLE `Events` DROP FOREIGN KEY `Events_id_client_fkey`;

-- DropTable
DROP TABLE `Client`;

-- CreateTable
CREATE TABLE `Clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `status` ENUM('enable', 'disabled', 'deleted') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
