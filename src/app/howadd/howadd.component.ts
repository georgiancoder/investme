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
  breadcrumbs = {
    page: '',
    home: ''
  };
  constructor(private sanitizer:DomSanitizer,private langsservice: LangsService, private textPagesService: TextPagesService) { }

  pageCont(){
    this.textPagesService.howadd(this.lang).subscribe(data=>{
      this.pageData = data;
      console.log(this.pageData.howadds);
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
    setInterval(()=>{
      this.breadcrumbs.page = 'როგორ დავამატო?';
      this.breadcrumbs.home = 'მთავარი';
    },500);
  }

}
