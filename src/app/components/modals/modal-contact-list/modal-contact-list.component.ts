import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientContacts, ContactsType } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-modal-contact-list',
  templateUrl: './modal-contact-list.component.html',
  styleUrls: ['./modal-contact-list.component.scss'],
})
export class ModalContactListComponent {
  @Input() contact: ClientContacts;
  @Input() index: number;
  @Output() savedContact = new EventEmitter<ClientContacts>();
  @Output() deleteContact = new EventEmitter();
  isOpenContacts = false;
  selectedType: ContactsType = 'Телефон';
  typeValue = '';

  openContacts() {
    this.isOpenContacts = true;
  }

  closeContacts() {
    this.isOpenContacts = false;
  }

  setType(event: any) {
    this.selectedType = event.innerHTML;
    console.log(this.typeValue);
  }

  delete() {
    this.deleteContact.emit();
  }

  saveContact() {
    this.savedContact.emit({
      index: this.index,
      type: this.selectedType,
      value: this.typeValue,
    });
  }
}
