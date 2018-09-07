import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-howsupport',
  templateUrl: './howsupport.component.html',
  styleUrls: ['./howsupport.component.scss']
})
export class HowsupportComponent implements OnInit {

  breadcrumbs: object;
  lang: string;
  pageData: any;
  title: string;
  description: string;
  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }
  pageCont(){
    this.textPagesService.howsupport(this.lang).subscribe(data=>{
      this.pageData = data;
      this.title = this.pageData.howsupport.title;
      this.description = this.pageData.howsupport.description;
    });
  }
  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.pageCont();
    document.addEventListener('langchanged', (e) => {
      this.lang = this.langsservice.getLang();
      this.pageCont();
    });

    this.breadcrumbs = {
      page: this.title,
      home: 'მთავარი'
    };
    setInterval(()=>{this.breadcrumbs.page = this.title;},200);
  }

}
