import { Address, Client } from '@/types/PrismaTypes';

export type ClientPopulate = Client & {
  address: Address;
};
