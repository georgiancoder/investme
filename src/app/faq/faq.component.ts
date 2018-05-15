import { Component, OnInit, ViewChild  } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

import { AskmodalComponent } from '../widgets/askmodal/askmodal.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  @ViewChild(AskmodalComponent) askModal: AskmodalComponent;

  lang:string;

  faqContent:string;

  breadcrumbs: object;

  faq(){
    this.textPagesService.faq(this.lang).subscribe(content=>{
      this.faqContent = content;
    });
  }

  openModal(){
    this.askModal.show();
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.faq();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.faq();
    });

    this.breadcrumbs = {
      page: 'ხშირად დასმული შეკითხვები',
      home: 'მთავარი'
    }
  }

}
