export type ContactsType = 'Телефон' | 'Email' | 'Facebook' | 'VK' | 'Другое';
export type ModalTitle = 'Новый клиент' | 'Изменить данные';
export type ModalCancelButton = 'Отмена' | 'Удалить клиента';
export type ModalSaveButton = 'Добавить' | 'Изменить';

export interface ClientContacts {
  index: number;
  type: ContactsType;
  value: string;
}

export interface Client {
  id: string;
  name: string | null | undefined;
  surname: string | null | undefined;
  lastName: string | null | undefined;
  contacts?: ClientContacts[];
  createdAt: Date;
  updatedAt: Date;
}
