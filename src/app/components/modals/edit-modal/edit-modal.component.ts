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
import { ClientsService } from '../../../services/clients.service';
import { ContactsService } from '../../../services/contacts.service';
import { FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { Client, ClientContacts } from '../../../interfaces/interfaces';
import { Observable, Subscription } from 'rxjs';

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
  @Output() updateClient = new EventEmitter();

  contactsFormOpen = false;
  isLoading = false;
  isFormInvalid = false;
  isContacts = false;
  contactsCounter = 0;
  isDeleted = false;
  client: Client;
  clientSubscription: Subscription;
  contacts: ClientContacts[];
  clients: Client[];
  form: FormGroup;

  ngOnInit(): void {
    this.clientSubscription = this.clientService.getById(this.id).subscribe((client: Client) => {
      this.client = client;
      if (client.contacts) {
        this.contactsService.addAllContacts(client.contacts);
      }
      this.form = new FormGroup({
        surname: new FormControl<string>(client.surname, [
          Validators.required,
          Validators.pattern('[а-яёА-ЯЁ ]+'),
        ]),
        name: new FormControl<string>(client.name, [
          Validators.required,
          Validators.pattern('[а-яёА-ЯЁ ]+'),
        ]),
        lastname: new FormControl<string>(client.lastName, [
          Validators.required,
          Validators.pattern('[а-яёА-ЯЁ ]+'),
        ]),
      });
    });
  }

  ngOnDestroy(): void {
    this.contactsService.clearContacts();
    this.clientSubscription.unsubscribe();
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
    this.contactsService.addContact({
      index: this.contactsService.getContacts().length + 1,
      type: 'Телефон',
      value: '',
    });
  }

  submit() {
    if (this.form.invalid || this.isContacts) {
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
        this.updateClient.emit();
      });
  }

  handleClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  deleteContactByIndex(event: ClientContacts) {
    return this.contactsService.deleteContact(event);
  }

  deleteClientEvent(event: MouseEvent) {
    event.preventDefault();
    this.deleteClient.emit();
    this.closeModal.emit();
  }

  showErrorMessage() {
    if (this.form.invalid) {
      this.isFormInvalid = true;
    } else {
      this.isFormInvalid = false;
    }
  }

  isContactsInvalid(event: any) {
    if (event == 'INVALID') {
      this.isContacts = true;
    } else {
      this.isContacts = false;
    }
  }
}
