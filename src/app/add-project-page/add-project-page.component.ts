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
  constructor(private langsservice: LangsService, private textPagesService: TextPagesService) { }
  pageData:any;
  pageCont(){
    this.textPagesService.addProject(this.lang).subscribe(data=>{
      this.pageData = data;
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
      page: 'პროექტის დამატება',
      home: 'მთავარი'
    };
  }

}
