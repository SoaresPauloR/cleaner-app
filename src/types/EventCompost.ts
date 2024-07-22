import { Client, Events, Users } from '@prisma/client';

export type EventCompost = Events & {
  client: Client;
  cleaner: Users;
};
