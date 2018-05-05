import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  lang:string;

  rulesContent:string;

  rules(){
    this.textPagesService.rules(this.lang).subscribe(content=>{
      this.rulesContent = content;
    });
  }

  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.rules();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.rules();
    });
  }

}
