import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  lang:string;

  contactContent:string;

  contact(){
    this.textPagesService.contact(this.lang).subscribe(content=>{
      this.contactContent = content;
    });
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.contact();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.contact();
    });
  }

}
