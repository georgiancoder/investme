import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss','./contact.responsive.scss']
})
export class ContactComponent implements OnInit {

  lang:string;

  breadcrumbs: object;

  lat: number = 51.678418;
  lng: number = 7.809007;
  contactContent:string;

  contact(){
    this.textPagesService.contact(this.lang).subscribe(content=>{
      this.contactContent = content;
    });
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
