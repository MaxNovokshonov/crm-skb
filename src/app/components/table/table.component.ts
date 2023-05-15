import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../interfaces/interfaces';
import { ClientsService } from '../../services/clients.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private clientsService: ClientsService) {}

  isAddModalOpen = false;
  @Input() searchStr: string;
  loader = false;
  clients: Client[] = [];
  clients$: Observable<Client[]>;
  sortDirection = 1;
  sortField = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.loader = true;
    setTimeout(() => {
      this.clients$ = combineLatest(this.clientsService.getAll(), this.sortField).pipe(
        map(([client, field]) => {
          return [
            ...client.sort((aPerson, bPerson) => {
              const path = field.split('.');
              const aPropValue = this.clientsService.getPropByPath(aPerson, path);
              const bPropValue = this.clientsService.getPropByPath(bPerson, path);

              const less = -1 * this.sortDirection;
              const more = 1 * this.sortDirection;

              if (typeof aPropValue === 'string') {
                return aPropValue.toLowerCase() <= bPropValue.toLowerCase() ? less : more;
              } else {
                return aPropValue <= bPropValue ? less : more;
              }
            }),
          ];
        }),
      );
    }, 500);
    this.loader = false;
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  sortBy(field: string): void {
    console.log(field);
    if (field === this.sortField.getValue()) {
      this.sortDirection *= -1;
      console.log(this.sortDirection);
    } else {
      this.sortDirection = 1;
    }
    this.sortField.next(field);
  }
}
