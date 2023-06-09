import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Client } from '../../interfaces/interfaces';
import { ClientsService } from '../../services/clients.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';

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
  clientsData = false;
  clients$: Observable<Client[]>;
  sortDirection = -1;
  sortField = new BehaviorSubject<string>('createdAt');

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.loader = true;
    this.clientsData = false;
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
    this.clientsData = true;
    this.loader = false;
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  sortBy(field: string): void {
    if (field === this.sortField.getValue()) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }
    this.sortField.next(field);
  }
}
