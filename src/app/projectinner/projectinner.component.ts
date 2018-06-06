import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { LangsService } from '../services/langs.service';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import  * as $  from 'jquery';

@Component({
  selector: 'app-projectinner',
  templateUrl: './projectinner.component.html',
  styleUrls: ['./projectinner.component.scss','./projectinner.responsive.scss']
})
export class ProjectinnerComponent implements OnInit {


  openPopup:boolean = false;

  teamMember:any;

  breadcrumbs: object;

  isAuthenticated: boolean = false;

  projectId: number;

  siteUrl: string = "https://back.investme.ge";

  media = [];

  siteLang: string;

  project: any;

  tabindex = 0;



  documents = [];

  getProject(){
    this.ProjectService.getProject(this.projectId, this.siteLang).subscribe(res=>{
      console.log(res);
      this.project = res;
      this.getMedia();
      this.getDocuments();
    });
  }

  getMedia(){
    let mainimg = {
      type: 'image',
      image: this.siteUrl + this.project.project.image
    };
    this.media.push(mainimg);
    this.project.imageDetail.forEach(image=>{
      if(image.image && image.image.length > 0){
        image.type = 'image';
        image.image = this.siteUrl + image.image;
        this.media.push(image);
      }
    });
    this.project.videoDetail.forEach(video=>{
      if(video.link && video.link.length > 0){
        video.type = 'video';
        var video_id = video.link.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        video.link = video_id;
        video.image = "https://img.youtube.com/vi/" + video_id + "/1.jpg";
        this.media.push(video);
      }
    });
  }

  closePopup(close){
    this.openPopup = false;
  }

  memberPopup(member){
    this.openPopup = true;
    this.teamMember = member;
  }

  getDocuments(){
    this.project.fileDetail.forEach(doc=>{
      if(doc.file && doc.file.length > 0){
        var patt=/\.[0-9a-z]{1,5}$/i;
        var ext = doc.file.match(patt)[0];
        console.log(ext);
        switch(ext){
          case '.doc':
          doc.ico = '/assets/doc.png';
          break;
          case '.docx':
          doc.ico = '/assets/doc.png';
          break;
          case '.pdf':
          doc.ico = '/assets/pdf.png';
          break;
          case '.xls':
          doc.ico = '/assets/xls.png';
          break;
          case '.xlsx':
          doc.ico = '/assets/xls.png';
          break;
          default:
            doc.ico = '/assets/file.png';
        }
        this.documents.push(doc);
      }
    });
  }

  constructor(private auth: AuthService, private langservice: LangsService, private ProjectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.activatedRoute.params.subscribe((params: Params) => {
        this.projectId = params["id"];
      });


      this.siteLang = this.langservice.getLang();
      this.getProject();
      document.addEventListener('langchanged',()=>{
        this.siteLang = this.langservice.getLang();
        this.getProject();
      });

    this.activatedRoute.queryParams.subscribe(param=>{
      if(param['support']){
        this.tabindex = 3;

        $('html, body').animate({scrollTop: 900},1000);
      }
    });

    this.breadcrumbs = {
      page: 'პროექტები',
      home: 'მთავარი'
    }
  }

}
