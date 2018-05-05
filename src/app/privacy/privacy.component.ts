import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  lang:string;

  privacyContent:string;

  privacy(){
    this.textPagesService.privacy(this.lang).subscribe(content=>{
      this.privacyContent = content;
    });
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.privacy();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.privacy();
    });
  }

}
