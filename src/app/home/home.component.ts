import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lang: string = '';
  mainpagecontent: any[];

  getMainPage(): void{
    this.mainservice.getMainPage(this.lang).subscribe(maincontent => {this.mainpagecontent = maincontent; console.log(maincontent); });
  }


  constructor(private mainservice: MainService, private langsservice: LangsService) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.getMainPage();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.getMainPage();
    });
  }

}
