import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss','./privacy.responsive.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PrivacyComponent implements OnInit {

  lang:string;

  breadcrumbs: object;

  privacyContent:string;

  sidemenu: any;

  description: any;

  privacy(){
    this.textPagesService.privacy(this.lang).subscribe(content=>{
      this.privacyContent = content;
      this.description = this.sanitizer.bypassSecurityTrustHtml(content.policy.description);
    });
  }

  constructor(private sanitizer:DomSanitizer,private langsservice: LangsService, private textPagesService: TextPagesService) { }

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

    this.sidemenu = [
      {
        title: 'სარგებლობის წესები და პირობები',
        link: '/rules',
        active: false
      },
      {
      title: 'უსაფრთხოების პოლიტიკა',
      link: '/privacy',
      active: true
    }];
  }

}
