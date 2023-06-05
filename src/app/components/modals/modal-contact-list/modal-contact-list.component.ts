import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ClientContacts, Contacts, ContactsType } from '../../../interfaces/interfaces';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as IMask from 'imask';

@Component({
  selector: 'app-modal-contact-list',
  templateUrl: './modal-contact-list.component.html',
  styleUrls: ['./modal-contact-list.component.scss'],
})
export class ModalContactListComponent implements OnInit {
  @Input() contact: ClientContacts;
  @Input() index: number;
  @Output() deleteContact = new EventEmitter<ClientContacts>();
  @Output() contactStatus = new EventEmitter();
  isOpenContacts = false;
  types: Contacts[] = Object.values(Contacts);
  contactsForm = new FormGroup({
    control: new FormControl<string>(''),
  });
  inputMask: any;
  inputPlaceholder = '';

  get control() {
    return this.contactsForm.controls.control as FormControl;
  }

  constructor() {}

  private toggleValidators(contactType: string): void {
    const control = this.contactsForm.get('control');

    const phoneValidators: ValidatorFn[] = [Validators.required, Validators.minLength(18)];

    const emailValidators: ValidatorFn[] = [Validators.required, Validators.email];
    const requiredValidators: ValidatorFn[] = [Validators.required, Validators.maxLength(12)];

    switch (contactType) {
      case 'Телефон':
        control!.setValidators(phoneValidators);
        this.inputMask = { mask: '+7 (000) 000-00-00' };
        this.inputPlaceholder = '+7 (000) 000-00-00';
        break;
      case 'Email':
        control!.setValidators(emailValidators);
        this.inputMask = {
          mask: /^\S*@?\S*$/,
        };
        this.inputPlaceholder = 'example@mail.com';
        break;
      case 'VK':
        control!.setValidators(requiredValidators);
        this.inputMask = { mask: 'VK@00000000' };
        this.inputPlaceholder = 'VK@12345678';
        break;
      case 'Facebook':
        control!.setValidators(requiredValidators);
        this.inputMask = { mask: 'FB@aaaaaaaa' };
        this.inputPlaceholder = 'FB@abcdefgh';
        break;
      default:
        control!.setValidators(requiredValidators);
        this.inputMask = { mask: /[a-zA-Zа-яёА-ЯЁ0-9]+/ };
        this.inputPlaceholder = 'Введите данные';
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
    this.contact.value = '';
    this.toggleValidators(type);
  }

  delete(event: MouseEvent, contact: ClientContacts) {
    event.preventDefault();
    this.deleteContact.emit(contact);
  }

  ngOnInit() {
    this.toggleValidators(this.contact.type);
  }

  formStatus(status: any) {
    this.contactStatus.emit(status);
  }
}
