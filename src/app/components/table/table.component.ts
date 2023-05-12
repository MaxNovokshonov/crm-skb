import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Client } from '../../interfaces/interfaces';
import { ClientsService } from '../../services/clients.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  constructor(private clientsService: ClientsService) {}

  isAddModalOpen = false;
  editForm = true;
  loader = false;
  clients: Client[] = [];
  clients$: Observable<Client[]>;

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.loader = true;
    setTimeout(() => {
      this.clients$ = this.clientsService.getAll();
      this.loader = false;
    }, 1000);
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllClients();
  }
}
