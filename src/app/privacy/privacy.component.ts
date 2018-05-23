import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  lang:string;

  titles: string[];

  headings: any[];

  breadcrumbs: object;

  privacyContent:any;

  sidemenu: any;

  privacy(){
    this.textPagesService.privacy(this.lang).subscribe(content=>{
      this.privacyContent = content;
      this.headings = this.textPagesService.getPageTitles(this.privacyContent.policy);
      if(this.headings){
        this.headings.forEach(tag=>{
          this.titles.push(tag.match(/>(.*)</)[1]);
        });
      }
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

  }

}
