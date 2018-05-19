import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { LangsService } from '../services/langs.service';
import { Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.scss']
})
export class MyprojectsComponent implements OnInit {

  siteUrl = "https://back.investme.ge";

  siteLang: string;

  translation: any;
  myprojects: any;

  getMyProjects(){
    this.projectServce.getMyProjects(this.siteLang).subscribe(res=>{
      console.log(res);
      this.myprojects = res.projects;
      this.translation = res.translation;
    });
  }

  editProject(id){
    this.router.navigate(['/editproject/' + id]);
  }

  constructor(private projectServce: ProjectService, private langservice: LangsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.siteLang = this.langservice.getLang();
    document.addEventListener('langchanged',()=>{
      this.siteLang = this.langservice.getLang();
    });
    this.getMyProjects();
  }

}
