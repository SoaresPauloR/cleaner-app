import { PayMethod, ValueType } from '@prisma/client';

export type EventPayload = {
  id_client: number;
  id_cleaner: number;
  more_cleaner: string;
  date_start: Date;
  date_finish: Date;
  more: string;
  value: number;
  value_type: ValueType;
  pay_method: PayMethod;
};
