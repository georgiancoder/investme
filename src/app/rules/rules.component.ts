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

  titles: string[];

  headings: any[];

  rulesContent:any;

  breadcrumbs: object;

  sidemenu: any;

  rules(){
    this.textPagesService.rules(this.lang).subscribe(content=>{
      this.rulesContent = content;
      this.headings = this.textPagesService.getPageTitles(this.rulesContent.rule);
      if(this.headings){
        this.headings.forEach(tag=>{
          this.titles.push(tag.match(/>(.*)</)[1]);
        });
      }

      this.rulesContent.rule = this.textPagesService.markHeadings(this.rulesContent.rule);
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
    };

  }

}
