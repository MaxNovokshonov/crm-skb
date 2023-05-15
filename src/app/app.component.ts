import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CRM-skb';
  search = '';

  constructor() {}

  ngOnInit(): void {}

  searchEvent(str: any) {
    this.search = str;
  }
}
