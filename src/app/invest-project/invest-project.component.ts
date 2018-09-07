import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-invest-project',
  templateUrl: './invest-project.component.html',
  styleUrls: ['./invest-project.component.scss']
})
export class InvestProjectComponent implements OnInit {
  breadcrumbs = {
    page: '',
    home: ''
  };
  lang: string;
  pageData: any;
  title: string;
  description: string;
  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }
  pageCont(){
    this.textPagesService.investPorject(this.lang).subscribe(data=>{
      this.pageData = data;
      this.title = this.pageData.supportproject.title;
      this.description = this.pageData.supportproject.description;
    });
  }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.pageCont();
    document.addEventListener('langchanged', (e) => {
      this.lang = this.langsservice.getLang();
      this.pageCont();
    });

    this.breadcrumbs.page = this.title;
    this.breadcrumbs.home = 'მთავარი';
    setTimeout(()=>{this.breadcrumbs.page = this.title;},500);
  }


}
