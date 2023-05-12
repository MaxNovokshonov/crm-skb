import { Component, Input } from '@angular/core';
import { ClientContacts } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-modal-contact-list',
  templateUrl: './modal-contact-list.component.html',
  styleUrls: ['./modal-contact-list.component.scss'],
})
export class ModalContactListComponent {
  @Input() contact: ClientContacts;
}
