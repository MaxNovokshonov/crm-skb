import {Component, Input} from '@angular/core';
import {Client} from "../../interfaces/interfaces";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() clients: Client[]
  loader = true;
}
