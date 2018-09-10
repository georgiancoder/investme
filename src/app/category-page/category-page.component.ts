import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { LangsService } from '../services/langs.service';
import { DomSanitizer} from '@angular/platform-browser';

import { TextPagesService } from '../services/text-pages.service';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryPageComponent implements OnInit {

  lang: string;
  catId: number;
  textCont: any;
  title: string;
  description: any;
  breadcrumbs = {
    page: '',
    home: ''
  };
  constructor(private sanitizer:DomSanitizer,private textPageService: TextPagesService, private route: ActivatedRoute, private langService: LangsService) { }

  getPage(){
    this.textPageService.getCategoryPage(this.catId,this.lang).subscribe(cont=>{
        this.textCont = cont;
        this.title = this.textCont.title;
        this.description = this.sanitizer.bypassSecurityTrustHtml(this.textCont.description);
        console.log(this.textCont.description);
    });
  }

  ngOnInit() {
    this.lang = this.langService.getLang();
    this.route.params.subscribe(param=>{
      this.catId = param.id;
    });
    this.getPage();
    document.addEventListener('langchanged', (e) => {
      this.lang = this.langService.getLang();
      this.getPage();
    });
    this.breadcrumbs.page = this.title;
    this.breadcrumbs.home = 'მთავარი';
    setTimeout(()=>{this.breadcrumbs.page = this.title;},500);

  }

}
