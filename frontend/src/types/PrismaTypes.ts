export type TypeUsers = 'Admin' | 'Cleaner';

export type Status = 'enable' | 'disabled' | 'deleted';

export type Users = {
  id: number;
  email: string;
  name: string;
  number: string;
  type: TypeUsers;
  id_google: string;
  status: Status;
};

export type Client = {
  id: number;
  name: string;
  number: string;
  status: Status;
  address: Address;
};

export type Address = {
  id: number;
  postcode: string;
  street: string;
  status: Status;
  house_number: number;
  id_client: number;
};

export type Events = {
  id: number;
  id_client: number;
  id_cleaner: number;
  more_cleaner: string;
  status: Status;
  date_start: Date;
  date_finish: Date;
  more: string;
  value: number;
  value_type: ValueType;
  pay_method: PayMethod;
};

export type ValueType = 'perHour' | 'total';

export type PayMethod = 'clientPay' | 'adminPay';
