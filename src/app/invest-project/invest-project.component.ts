import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-invest-project',
  templateUrl: './invest-project.component.html',
  styleUrls: ['./invest-project.component.scss']
})
export class InvestProjectComponent implements OnInit {
  breadcrumbs: object;
  lang:string;
  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }
  pageData:any;
  pageCont(){
    this.textPagesService.getPageData('supportproject',this.lang).subscribe(data=>{
      this.pageData = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.pageCont();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.pageCont();
    });

    this.breadcrumbs = {
      page: 'პროექტის დაფინანსება',
      home: 'მთავარი'
    };
  }


}
