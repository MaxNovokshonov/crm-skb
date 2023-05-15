import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../interfaces/interfaces';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipe implements PipeTransform {
  transform(clients: Client[], search = ''): Client[] {
    if (!search.trim()) {
      return clients;
    }
    return clients.filter((client) => {
      return (
        client.surname!.toLowerCase().includes(search.toLowerCase()) ||
        client.name!.toLowerCase().includes(search.toLowerCase()) ||
        client.lastName!.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
