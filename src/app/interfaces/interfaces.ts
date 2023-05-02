export interface Client {
  id: string
  name: string;
  surname: string;
  lastName?: string;
  contacts?: { type: string, value: string };
  createdAt: Date;
  updatedAt: Date;

}
