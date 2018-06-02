import { Component, OnInit } from '@angular/core';
import { EventsService } from "../services/events.service";
import { LangsService } from '../services/langs.service';
import { Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-events-innner',
  templateUrl: './events-innner.component.html',
  styleUrls: ['./events-innner.component.scss']
})
export class EventsInnnerComponent implements OnInit {

  id: number;
  siteUrl: string = "https://back.investme.ge";
  lang:string;
  event: any;

  breadcrumbs: object;

  constructor(private langsservice: LangsService, private eventService: EventsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
    this.lang = this.langsservice.getLang();
    this.breadcrumbs = {
      page: 'ღონისძიებები',
      home: 'მთავარი'
    }

  }

}
