import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { LangsService } from '../services/langs.service';
import { Router, ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-favoriteprojects',
  templateUrl: './favoriteprojects.component.html',
  styleUrls: ['./favoriteprojects.component.scss','./favoriteprojects.responsive.scss']
})
export class FavoriteprojectsComponent implements OnInit {

  siteUrl = "https://back.investme.ge";

  siteLang: string;

  translation: any;
  myprojects: any;

  getFavoriteProjects(){
    this.projectServce.getFavoriteProjects(this.siteLang).subscribe(res=>{
      console.log(res);
      this.myprojects = res.projects;
      this.translation = res.translation;
    });
  }

  constructor(private projectServce: ProjectService, private langservice: LangsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.siteLang = this.langservice.getLang();
    document.addEventListener('langchanged',()=>{
      this.siteLang = this.langservice.getLang();
    });
    this.getFavoriteProjects();
  }

}
