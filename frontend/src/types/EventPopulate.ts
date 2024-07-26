import { Client, Events, Users } from '@/types/PrismaTypes';

export type EventPopulate = Events & {
  client: Client;
  cleaner: Users;
  error?: string;
};
