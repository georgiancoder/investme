import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';
import { AgmCoreModule } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss','./contact.responsive.scss']
})
export class ContactComponent implements OnInit {

  lang:string;
  map: any;
  breadcrumbs: object;
  marker: any;


  lat: number = 20.3452213;
  lng: number = 21.323342;
  contactContent:any;

  contact(){
    this.textPagesService.contact(this.lang).subscribe(content=>{
      this.contactContent = content;
      this.lat = Number(this.contactContent.contact.lat);
      this.lng = Number(this.contactContent.contact.long);
    });
  }

  mapReady(map) {
    this.map = map;
    setTimeout(()=>{
      this.map.setZoom(15);
      this.map.setCenter({ lat: this.lat, lng: this.lng });
      this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.lat, this.lng),
          map: this.map,
      });
    },1000);
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.contact();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.contact();
    });

    this.breadcrumbs = {
      page: 'კონტაქტი',
      home: 'მთავარი'
    }
  }

}
