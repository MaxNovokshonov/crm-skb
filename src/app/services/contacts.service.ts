import { Injectable } from '@angular/core';
import { ClientContacts } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts: ClientContacts[] = [];
  isValid = false;

  addContact(contact: ClientContacts) {
    this.contacts.push(contact);
  }

  addAllContacts(contacts: ClientContacts[]) {
    const newContacts = this.contacts.concat(contacts);
    this.contacts = newContacts;
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
