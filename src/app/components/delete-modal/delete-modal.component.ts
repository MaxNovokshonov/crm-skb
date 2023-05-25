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

  constructor(private clientsService: ClientsService) {}

  closeModalEvent() {
    this.closeModal.emit();
  }

  deleteById(id: string) {
    this.isDeleted = false;
    this.isDeleting = true;
    this.clientsService.deleteById(id).subscribe(() => {
      this.isDeleting = false;
      this.isDeleted = true;
      this.deleteClient.emit();
    });
  }

  handleClick($event: MouseEvent) {
    $event.stopPropagation();
  }
}
