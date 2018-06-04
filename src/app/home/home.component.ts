import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { LangsService } from '../services/langs.service';
import { Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./responsive.scss']
})
export class HomeComponent implements OnInit {

  lang: string = '';
  mainpagecontent: any;

  projects: any;

  getMainPage(): void{
    this.mainservice.getMainPage(this.lang).subscribe(maincontent => {
      this.mainpagecontent = maincontent;
      console.log(maincontent);
      this.projects = this.mainpagecontent.projects;
    });
  }

  getFilteredProjects(projects){
    this.projects = projects;
  }


  constructor(private mainservice: MainService, private langsservice: LangsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.getMainPage();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.getMainPage();
    });
  }

}
