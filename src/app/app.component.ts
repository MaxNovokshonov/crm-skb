import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClientsService } from './services/clients.service';
import { Observable, Subscription } from 'rxjs';
import { Client } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CRM-skb';

  constructor() {}

  ngOnInit(): void {}
}
