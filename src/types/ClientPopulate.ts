import { Address, Client } from '@prisma/client';

export type ClientPopulate = Client & {
  address: Address;
};
