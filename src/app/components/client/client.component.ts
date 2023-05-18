import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  constructor(private clientsService: ClientsService) {}

  @Input() client: Client;
  @Output() delete = new EventEmitter();
  clients: Client[] = [];
  isDeleteModalOpen = false;

  deleteById() {
    this.delete.emit();
  }
}
