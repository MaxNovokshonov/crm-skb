import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ClientContacts, Contacts, ContactsType } from '../../../interfaces/interfaces';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-contact-list',
  templateUrl: './modal-contact-list.component.html',
  styleUrls: ['./modal-contact-list.component.scss'],
})
export class ModalContactListComponent implements OnInit {
  @Input() contact: ClientContacts;
  @Input() index: number;
  @Output() deleteContact = new EventEmitter<ClientContacts>();
  isOpenContacts = false;
  types: Contacts[] = Object.values(Contacts);
  contactsForm = new FormGroup({
    control: new FormControl<string>(''),
  });

  get control() {
    return this.contactsForm.controls.control as FormControl;
  }

  constructor() {}

  private toggleValidators(contactType: string): void {
    const control = this.contactsForm.get('control');

    const phoneValidators: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern('[0-9]+'),
    ];

    const emailValidators: ValidatorFn[] = [Validators.required, Validators.email];
    const requiredValidators: ValidatorFn[] = [Validators.required];

    switch (contactType) {
      case 'Телефон':
        control!.setValidators(phoneValidators);
        break;
      case 'Email':
        control!.setValidators(emailValidators);
        break;
      default:
        control!.setValidators(requiredValidators);
    }

    control!.updateValueAndValidity();
  }

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
    this.toggleValidators(type);
  }

  delete(event: MouseEvent, contact: ClientContacts) {
    event.preventDefault();
    this.deleteContact.emit(contact);
  }

  ngOnInit() {
    this.toggleValidators(this.contact.type);
  }
}
