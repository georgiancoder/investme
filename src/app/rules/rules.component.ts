import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  lang:string;

  rulesContent:string;

  breadcrumbs: object;

  sidemenu: any;

  rules(){
    this.textPagesService.rules(this.lang).subscribe(content=>{
      this.rulesContent = content;
    });
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.rules();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.rules();
    });

    this.breadcrumbs = {
      page: 'სარგებლობის წესები და პირობები',
      home: 'მთავარი'
    }

    this.sidemenu = [{
      title: 'უსაფრთხოების პოლიტიკა',
      link: '/privacy',
      active: false
    },{
      title: 'სარგებლობის წესები და პირობები',
      link: '/rules',
      active: true
    }];
  }

}
