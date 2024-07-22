/*
  Warnings:

  - You are about to drop the column `date` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `how_long` on the `Events` table. All the data in the column will be lost.
  - The values [perHouer] on the enum `Events_value_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_finish` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_start` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `status` ENUM('enable', 'disabled', 'deleted') NOT NULL;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `status` ENUM('enable', 'disabled', 'deleted') NOT NULL;

-- AlterTable
ALTER TABLE `Events` DROP COLUMN `date`,
    DROP COLUMN `how_long`,
    ADD COLUMN `date_finish` DATETIME(3) NOT NULL,
    ADD COLUMN `date_start` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('enable', 'disabled', 'deleted') NOT NULL,
    MODIFY `value_type` ENUM('perHour', 'total') NOT NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `status` ENUM('enable', 'disabled', 'deleted') NOT NULL;
