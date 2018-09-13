import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';
import { DomSanitizer} from '@angular/platform-browser';

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
  title: string;
  description: any;

  constructor(private sanitizer:DomSanitizer,private langsservice: LangsService, private textPagesService: TextPagesService) { }

  about(){
    this.textPagesService.about(this.lang).subscribe(content=>{
      this.aboutContent = content;
      // this.aboutContent.about = String(this.aboutContent.about).replace(/<\/?p[^>]*>/g, '');
      this.title = this.aboutContent.about.title;
      this.description = this.sanitizer.bypassSecurityTrustHtml(this.aboutContent.about.description);
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
      page: this.title,
      home: 'მთავარი'
    };
    setInterval(()=>{this.breadcrumbs['page'] = this.title;},500);
  }

}
