import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ContactsService } from '../../../services/contacts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client, ClientContacts } from '../../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, OnDestroy {
  constructor(private clientService: ClientsService, public contactsService: ContactsService) {}

  @Input() id: string;
  @Output() closeModal = new EventEmitter();
  @Output() getAll = new EventEmitter();
  @Output() deleteClient = new EventEmitter();

  contactsFormOpen = false;
  isLoading = false;
  isFormInvalid = false;
  contactsCounter = 0;
  isDeleted = false;
  client: Client;
  clients: Client[];
  form: FormGroup;

  ngOnInit(): void {
    this.clientService.getById(this.id).subscribe((client: Client) => {
      this.client = client;
      this.form = new FormGroup({
        surname: new FormControl<string>(client.surname, [
          Validators.required,
          Validators.pattern('[А-Яа-я]+'),
        ]),
        name: new FormControl<string>(client.name, [
          Validators.required,
          Validators.pattern('[А-Яа-я]+'),
        ]),
        lastname: new FormControl<string>(client.lastName, [
          Validators.required,
          Validators.pattern('[А-Яа-я]+'),
        ]),
      });
    });
  }

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

    this.clientService
      .updateClient({
        ...this.client,
        surname: this.form.value.surname,
        name: this.form.value.name,
        lastName: this.form.value.lastname,
        updatedAt: new Date(),
        contacts: this.contactsService.getContacts().filter((contact) => {
          return contact.value !== '';
        }),
      })
      .subscribe(() => {
        this.form.reset();
        console.log('Клиент изменен');
        this.isLoading = false;
        this.contactsService.clearContacts();
        this.closeModal.emit();
        this.deleteClient.emit();
      });
  }

  handleClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  deleteContactByIndex(event: ClientContacts) {
    return this.contactsService.deleteContact(event);
  }

  deleteClientById(id: string, event: MouseEvent) {
    event.preventDefault();
    this.clientService.getAll().subscribe((clients: Client[]) => {
      this.clientService.deleteById(id).subscribe((client: Client) => {
        this.clients = this.clients.filter((client: Client) => client.id !== id);
      });
    });
    this.isDeleted = true;
    this.deleteClient.emit();
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
