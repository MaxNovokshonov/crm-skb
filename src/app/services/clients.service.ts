import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Client } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  constructor(private http: HttpClient) {}

  getPropByPath(object: any, path: string[]): any {
    return path.reduce((obj, propName) => obj[propName], object);
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>('https://crm-skb-default-rtdb.firebaseio.com/clients.json').pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      }),
    );
  }

  getById(id: string): Observable<Client> {
    return this.http
      .get<Client>(`https://crm-skb-default-rtdb.firebaseio.com/clients/${id}.json`)
      .pipe(
        map((client: Client) => {
          return {
            ...client,
            id,
          };
        }),
      );
  }
  deleteById(id: string): Observable<Client> {
    return this.http.delete<Client>(
      `https://crm-skb-default-rtdb.firebaseio.com/clients/${id}.json`,
    );
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(
      `https://crm-skb-default-rtdb.firebaseio.com/clients.json`,
      client,
    );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.patch<Client>(
      `https://crm-skb-default-rtdb.firebaseio.com/clients/${client.id}.json`,
      client,
    );
  }
}
