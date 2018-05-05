import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutContent:string;
  lang: string;

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  about(){
    this.textPagesService.about(this.lang).subscribe(content=>{
      this.aboutContent = content;
    });
  }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.about();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.about();
    });
  }

}
