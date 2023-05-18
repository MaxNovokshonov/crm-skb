import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientContacts, Contacts, ContactsType } from '../../../interfaces/interfaces';
import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-modal-contact-list',
  templateUrl: './modal-contact-list.component.html',
  styleUrls: ['./modal-contact-list.component.scss'],
})
export class ModalContactListComponent {
  @Input() contact: ClientContacts;
  @Input() index: number;
  @Output() deleteContact = new EventEmitter<ClientContacts>();
  isOpenContacts = false;
  selectedType: ContactsType = 'Телефон';
  typeValue = '';
  types = Object.values(Contacts);

  constructor(private contactsService: ContactsService) {}

  openContacts(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isOpenContacts = true;
  }

  closeContacts() {
    this.isOpenContacts = false;
  }

  setType(type: ContactsType) {
    this.contact.type = type;
  }

  delete(event: MouseEvent, contact: ClientContacts) {
    event.preventDefault();
    this.deleteContact.emit(contact);
  }
}
