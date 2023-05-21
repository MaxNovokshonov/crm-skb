import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  Client,
  ClientContacts,
  ModalCancelButton,
  ModalSaveButton,
  ModalTitle,
} from '../../../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  constructor(private clientService: ClientsService, public contactsService: ContactsService) {}

  @Input() title: ModalTitle;
  @Input() id: string;
  @Input() saveButtonTitle: ModalSaveButton;
  @Input() cancelButtonTitle: ModalCancelButton;
  @Output() closeModal = new EventEmitter();
  @Output() getAll = new EventEmitter();

  contactsFormOpen = false;
  isLoading = false;
  isFormInvalid = false;
  contactsCounter = 0;
  form = new FormGroup({
    surname: new FormControl<string>('', [Validators.required, Validators.pattern('[А-Яа-я]+')]),
    name: new FormControl<string>('', [Validators.required, Validators.pattern('[А-Яа-я]+')]),
    lastname: new FormControl<string>('', [Validators.required, Validators.pattern('[А-Яа-я]+')]),
  });

  get surname() {
    return this.form.controls.surname as FormControl;
  }

  get name() {
    return this.form.controls.name as FormControl;
  }

  get lastname() {
    return this.form.controls.lastname as FormControl;
  }

  closeModalEvent() {
    this.closeModal.emit();
  }

  increment(event: Event) {
    event.preventDefault();
    this.contactsFormOpen = true;
    this.contactsCounter++;
    this.contactsService.addContact({ index: this.contactsCounter, type: 'Телефон', value: '' });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const client: Client = {
      id: '',
      surname: this.form.value.surname,
      name: this.form.value.name,
      lastName: this.form.value.lastname,
      createdAt: new Date(),
      updatedAt: new Date(),
      contacts: this.contactsService.getContacts().filter((contact) => {
        return contact.value !== '';
      }),
    };

    this.clientService.addClient(client).subscribe(() => {
      this.form.reset();
      console.log('Клиент создан');
      this.isLoading = false;
      this.contactsService.clearContacts();
      this.closeModal.emit();
      this.getAll.emit();
    });
  }

  handleClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  deleteContactByIndex(event: ClientContacts) {
    return this.contactsService.deleteContact(event);
  }

  ngOnDestroy(): void {
    this.contactsService.clearContacts();
  }

  showErrorMessage() {
    if (this.form.invalid) {
      this.isFormInvalid = true;
    }
  }
}
