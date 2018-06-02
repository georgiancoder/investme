import { Component, OnInit } from '@angular/core';
import {LangsService} from '../services/langs.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  siteUrl: string = "https://back.investme.ge";

  lang: string;

  breadcrumbs: object;

  events:any;
  constructor(private langsservice: LangsService) { }

  ngOnInit() {

    this.breadcrumbs = {
      page: 'ღონისძიებები',
      home: 'მთავარი'
    }
  }

}
