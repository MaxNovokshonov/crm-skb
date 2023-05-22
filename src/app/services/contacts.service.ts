import { Injectable } from '@angular/core';
import { ClientContacts } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts: ClientContacts[] = [];

  addContact(contact: ClientContacts) {
    this.contacts.push(contact);
  }

  addAllContacts(contacts: ClientContacts[]): ClientContacts[] {
    return (this.contacts = contacts);
  }

  getContacts(): ClientContacts[] {
    return this.contacts;
  }

  deleteContact(deleteContact: ClientContacts) {
    this.contacts = this.contacts.filter((contact) => {
      return contact.index !== deleteContact.index;
    });
  }

  clearContacts() {
    this.contacts = [];
  }
}
