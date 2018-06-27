import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss','./about.component.responsive.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  aboutContent:any;
  lang: string;


  breadcrumbs: object;

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  about(){
    this.textPagesService.about(this.lang).subscribe(content=>{
      this.aboutContent = content;
      this.aboutContent.about = String(this.aboutContent.about).replace(/<\/?p[^>]*>/g, '');
    });
  }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.about();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.about();
    });

    this.breadcrumbs = {
      page: 'ჩვენს შესახებ',
      home: 'მთავარი'
    }
  }

}
