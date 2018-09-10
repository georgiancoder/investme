import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';
import {AppComponent} from '../app.component';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProjectPageComponent implements OnInit {
  breadcrumbs: object;
  lang:string;
  pageData:any;
  title: string;
  description: any;
  constructor(private sanitizer:DomSanitizer,private langsservice: LangsService, private textPagesService: TextPagesService, private authService: AuthService, private router: Router, public myapp: AppComponent) { }
  pageCont(){
    this.textPagesService.addProject(this.lang).subscribe(data=>{
      this.pageData = data;
      console.log(this.pageData);
      this.title = this.pageData.addproject.title;
      this.description = this.sanitizer.bypassSecurityTrustHtml(this.pageData.addproject.description);
    });
  }

  addProject(){
   if(this.authService.isAuthenticated()){
     this.router.navigate(['/addProject']);
   }else{
     this.myapp.regDropdown();
   }
  }


  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.pageCont();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.pageCont();
    });

    this.breadcrumbs = {
      page: this.title,
      home: 'მთავარი'
    };
    setTimeout(()=>{this.breadcrumbs['page'] = this.title;},500);
  }

}
