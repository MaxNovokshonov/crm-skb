import {Component, OnInit} from '@angular/core';
import {ClientsService} from "./services/clients.service";
import {Observable, Subscription} from "rxjs";
import {Client} from "./interfaces/interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRM-skb';
  editForm = true;
  clientsSub: Subscription;
  clients: Client[] = [];

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.clientsSub = this.clientsService.getAll().subscribe((clients) => {
      this.clients = clients;
      console.log(this.clients);
    });
  }
}
