import { Component, OnInit } from '@angular/core';
import { TextPagesService } from '../services/text-pages.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss']
})
export class AddProjectPageComponent implements OnInit {
  breadcrumbs: object;
  lang:string;
  pageData:any;
  title: string;
  description: string;
  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }
  pageCont(){
    this.textPagesService.addProject(this.lang).subscribe(data=>{
      this.pageData = data;
      console.log(this.pageData);
      this.title = this.pageData.addproject.title;
      this.description = this.pageData.addproject.description;
    });
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
