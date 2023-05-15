import { Component, Input, OnInit } from '@angular/core';
import { ClientContacts } from '../../interfaces/interfaces';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  @Input() contact: ClientContacts;

  ngOnInit(): void {}
}
