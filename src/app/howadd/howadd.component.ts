import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-howadd',
  templateUrl: './howadd.component.html',
  styleUrls: ['./howadd.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HowaddComponent implements OnInit {
  // breadcrumbs: object;
  lang: string;
  pageData: any;
  title: string;
  description: any;
  breadcrumbs = {
    page: '',
    home: ''
  };
  constructor(private sanitizer:DomSanitizer,private langsservice: LangsService, private textPagesService: TextPagesService) { }

  pageCont(){
    this.textPagesService.howadd(this.lang).subscribe(data=>{
      this.pageData = data;
      this.title = this.pageData.howadd.title;
      this.description = this.sanitizer.bypassSecurityTrustHtml(this.pageData.howadd.description);
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

    this.breadcrumbs.page = this.title;
    this.breadcrumbs.home = 'მთავარი';
    setTimeout(()=>{this.breadcrumbs.page = this.title;},500);
  }

}
