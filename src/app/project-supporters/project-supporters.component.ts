import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { LangsService } from '../services/langs.service';
import { Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-project-supporters',
  templateUrl: './project-supporters.component.html',
  styleUrls: ['./project-supporters.component.scss']
})
export class ProjectSupportersComponent implements OnInit {

  siteUrl = "https://back.investme.ge";

  siteLang: string;

  translation: any;
  supportProjects: any;

  getFavoriteProjects(){
    this.projectServce.getFavoriteProjects(this.siteLang).subscribe(res=>{
      this.supportProjects = res.projects;
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
