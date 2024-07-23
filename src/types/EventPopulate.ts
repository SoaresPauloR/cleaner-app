import { Client, Events, Users } from '@prisma/client';

export type EventPopulate = Events & {
  client: Client;
  cleaner: Users;
};
