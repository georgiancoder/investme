import { Component, OnInit } from '@angular/core';
import {LangsService} from '../services/langs.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  p: number = 1;
  siteUrl: string = "https://back.investme.ge";

  lang: string;

  breadcrumbs: object;

  totalItems: number;

  events:any;

  getEventList():void{
    this.eventsService.getEventList(this.lang).subscribe(events=>{
        this.events = events;
    });
  }

  constructor(private eventsService: EventsService, private langsservice: LangsService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.getEventList();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.getEventList();
    });


    this.breadcrumbs = {
      page: 'ღონისძიებები',
      home: 'მთავარი'
    }
  }

}
