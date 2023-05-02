import {Component, Input} from '@angular/core';
import {Client} from "../../interfaces/interfaces";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  @Input() client: Client

}
