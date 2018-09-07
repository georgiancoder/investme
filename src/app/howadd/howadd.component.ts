import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-howadd',
  templateUrl: './howadd.component.html',
  styleUrls: ['./howadd.component.scss']
})
export class HowaddComponent implements OnInit {
  breadcrumbs: object;
  lang: string;
  pageData: any;
  title: string;
  description: string;
  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  pageCont(){
    this.textPagesService.howadd(this.lang).subscribe(data=>{
      this.pageData = data;
      this.title = this.pageData.howadd.title;
      this.description = this.pageData.howadd.description;
      // console.log(this.pageData.howadd);
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
    setTimeout(()=>{this.breadcrumbs.page = this.title;},500);
  }

}
