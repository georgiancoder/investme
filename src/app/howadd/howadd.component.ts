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
  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }
  pageCont(){
    this.textPagesService.howadd(this.lang).subscribe(data=>{
      this.pageData = data;
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
      page: 'page title',
      home: 'მთავარი'
    };
  }

}
