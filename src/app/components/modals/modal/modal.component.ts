import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Client,
  ClientContacts,
  ModalCancelButton,
  ModalSaveButton,
  ModalTitle,
} from '../../../interfaces/interfaces';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private clientService: ClientsService, private fb: FormBuilder) {}

  @Input() title: ModalTitle;
  @Input() id: string;
  @Input() saveButtonTitle: ModalSaveButton;
  @Input() cancelButtonTitle: ModalCancelButton;
  @Output() closeModal = new EventEmitter();
  @Output() getAll = new EventEmitter();

  contact: ClientContacts = { type: 'VK', value: '123' };
  contactsList: ClientContacts[] = [];
  contactsCounter = 0;
  form = new FormGroup({
    surname: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    lastname: new FormControl<string>('', Validators.required),
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

  ngOnInit(): void {}

  closeModalEvent() {
    this.closeModal.emit();
  }

  increment(event: Event) {
    event.preventDefault();
    this.contact.type = 'Телефон';
    this.contact.value = `${this.contactsCounter}`;
    this.contactsCounter++;
    this.contactsList.push(this.contact);
    console.log(this.contactsList);
    console.log(this.contactsCounter);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const client: Client = {
      id: '',
      surname: this.form.value.surname,
      name: this.form.value.name,
      lastName: this.form.value.lastname,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.clientService.addClient(client).subscribe(() => {
      this.form.reset();
      console.log('Клиент создан');
      this.closeModal.emit();
      this.getAll.emit();
    });
    console.log(client);
    console.log(this.form.value);
  }

  handleClick($event: MouseEvent) {
    $event.stopPropagation();
  }
}
