import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-howsupport',
  templateUrl: './howsupport.component.html',
  styleUrls: ['./howsupport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HowsupportComponent implements OnInit {

  // breadcrumbs: object;
  breadcrumbs = {
    page: '',
    home: ''
  };
  lang: string;
  pageData: any;
  title: string;
  description: any;
  constructor(private sanitizer:DomSanitizer,private langsservice: LangsService, private textPagesService: TextPagesService) { }
  pageCont(){
    this.textPagesService.howsupport(this.lang).subscribe(data=>{
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


    setInterval(()=>{
      this.breadcrumbs.page = 'როგორ დავაფინანასო';
      this.breadcrumbs.home = 'მთავარი';
    },500);
  }

}
