-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `type` ENUM('Admin', 'Cleaner') NOT NULL,
    `id_google` VARCHAR(191) NOT NULL,
    `status` ENUM('enable', 'disabled', 'deleted') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `status` ENUM('enable', 'disabled', 'deleted') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postcode` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `status` ENUM('enable', 'disabled', 'deleted') NOT NULL,
    `house_number` INTEGER NOT NULL,
    `id_client` INTEGER NOT NULL,

    UNIQUE INDEX `Address_id_client_key`(`id_client`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_client` INTEGER NOT NULL,
    `id_cleaner` INTEGER NOT NULL,
    `more_cleaner` VARCHAR(191) NOT NULL,
    `status` ENUM('enable', 'disabled', 'deleted') NOT NULL,
    `date_start` DATETIME(3) NOT NULL,
    `date_finish` DATETIME(3) NOT NULL,
    `more` VARCHAR(191) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `value_type` ENUM('perHour', 'total') NOT NULL,
    `pay_method` ENUM('clientPay', 'adminPay') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_id_cleaner_fkey` FOREIGN KEY (`id_cleaner`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
