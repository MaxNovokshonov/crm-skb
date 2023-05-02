// Доступные методы:
//   GET /api/clients - получить список клиентов, в query параметр search можно передать поисковый запрос
// POST /api/clients - создать клиента, в теле запроса нужно передать объект { name: string, surname: string, lastName?: string, contacts?: object[] }
// contacts - массив объектов контактов вида { type: string, value: string }
// GET /api/clients/{id} - получить клиента по его ID
// PATCH /api/clients/{id} - изменить клиента с ID, в теле запроса нужно передать объект { name?: string, surname?: string, lastName?: string, contacts?: object[] }
// contacts - массив объектов контактов вида { type: string, value: string }
// DELETE /api/clients/{id} - удалить клиента по ID

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Client} from "../interfaces/interfaces";

@Injectable({providedIn: "root"})
export class ClientsService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:3000/api/clients');
  }
}
