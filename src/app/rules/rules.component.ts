import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss','./rules.responsive.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RulesComponent implements OnInit {

  lang:string;

  rulesContent:string;

  breadcrumbs: object;

  sidemenu: any;

  description: any;

  rules(){
    this.textPagesService.rules(this.lang).subscribe(content=>{
      this.rulesContent = content;
      this.description = this.sanitizer.bypassSecurityTrustHtml(content.rule.description);
    });
  }

  constructor(private sanitizer:DomSanitizer,private langsservice: LangsService, private textPagesService: TextPagesService) { }

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

    this.sidemenu = [
      {
        title: 'სარგებლობის წესები და პირობები',
        link: '/rules',
        active: true
      },
      {
      title: 'უსაფრთხოების პოლიტიკა',
      link: '/privacy',
      active: false
    }
  ];
  }

}
