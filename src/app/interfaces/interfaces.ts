export type ContactsType = 'Телефон' | 'Email' | 'Facebook' | 'VK' | 'Другое';

export enum Contacts {
  phone = 'Телефон',
  email = 'Email',
  facebook = 'Facebook',
  vk = 'VK',
  other = 'Другое',
}

export interface ClientContacts {
  index: number;
  type: ContactsType;
  value: string;
}

export interface Client {
  id: string;
  name: string;
  surname: string;
  lastName: string;
  contacts?: ClientContacts[];
  createdAt: Date;
  updatedAt: Date;
}
