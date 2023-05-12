import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Input() id: string;
  @Output() closeModal = new EventEmitter();
  @Output() deleteClient = new EventEmitter();
  clients: Client[] = [];
  isDeleting = false;
  isDeleted = false;
  dSub: Subscription;

  constructor(private clientsService: ClientsService) {}

  closeModalEvent() {
    this.closeModal.emit();
  }

  deleteById(id: string) {
    this.isDeleted = false;
    this.isDeleting = true;
    setTimeout(() => {
      this.dSub = this.clientsService.deleteById(id).subscribe(() => {
        this.clients = this.clients.filter((client) => client.id !== id);
      });
      this.isDeleting = false;
      this.isDeleted = true;
    }, 1000);
    setTimeout(() => {
      this.deleteClient.emit();
    }, 1000);
  }

  handleClick($event: MouseEvent) {
    $event.stopPropagation();
  }
}
