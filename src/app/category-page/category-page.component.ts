import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { LangsService } from '../services/langs.service';

import { TextPagesService } from '../services/text-pages.service';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  
  lang: string;
  catId: number;
  textCont: any;
  title: string;
  description: string;
  breadcrumbs = {
    page: '',
    home: ''
  };
  constructor(private textPageService: TextPagesService, private route: ActivatedRoute, private langService: LangsService) { }

  getPage(){
    this.textPageService.getCategoryPage(this.catId,this.lang).subscribe(cont=>{
        this.textCont = cont;
        this.title = this.textCont.title;
        this.description = this.textCont.description;
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
