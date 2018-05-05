import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  lang:string;

  faqContent:string;

  faq(){
    this.textPagesService.faq(this.lang).subscribe(content=>{
      this.faqContent = content;
    });
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.faq();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.faq();
    });
  }

}
