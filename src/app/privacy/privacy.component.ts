import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss','./privacy.responsive.scss']
})
export class PrivacyComponent implements OnInit {

  lang:string;

  breadcrumbs: object;

  privacyContent:string;

  sidemenu: any;

  privacy(){
    this.textPagesService.privacy(this.lang).subscribe(content=>{
      this.privacyContent = content;
    });
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.privacy();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.privacy();
    });

    this.breadcrumbs = {
      page: 'უსაფრთხოების პოლიტიკა',
      home: 'მთავარი'
    }

    this.sidemenu = [{
      title: 'უსაფრთხოების პოლიტიკა',
      link: '/privacy',
      active: true
    },{
      title: 'სარგებლობის წესები და პირობები',
      link: '/rules',
      active: false
    }];
  }

}
