import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { LangsService } from '../services/langs.service';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import  * as $  from 'jquery';
import { ModalDialogService} from 'ngx-modal-dialog';
import { InvestProjectPopupComponent } from '../widgets/invest-project-popup/invest-project-popup.component';
import { CharityComponent } from '../widgets/charity/charity.component';
import { Lightbox } from 'angular2-lightbox';

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

  media_in = [];

  shortUrl: string;

  siteLang: string;

  project: any;

  pdf: any;

  titleBread: string;

  tabindex = 0;

  interests = [];

  cpd: boolean = false;



  documents = [];

  copied(event){
    this.cpd = true;
  }

  changeCategory(id){
    this.router.navigate(['allproject'],{queryParams:
        {
          category: id,
        }
    });
  }

  toggleFavorite(project){
    if(project.check_for_fav){
      // unfavorite
      this.ProjectService.removeFromFavorite(project.project.id).subscribe(res=>{
        if(res && res.status){
          project.check_for_fav = false;
        }
      });
    }else{
    // favorite
      this.ProjectService.addToFavorite(project.project.id).subscribe(res=>{
        if(res && res.status){
          project.check_for_fav = true;
        }
      });
    }
  }

  openawardstab(){
    this.tabindex = 3;
    $("html,body").animate({scrollTop: '900px'});
  }

  getProject(){
    this.ProjectService.getProject(this.projectId, this.siteLang).subscribe(res=>{
      this.project = res;
      this.project.money = this.project.money.toFixed(2);
      this.getMedia();
      this.getDocuments();
      this.titleBread = res.detail[0].title;
      console.log(this.project);
    });
  }

  share(){
    (<any>window).share(this.project);
  }

  open(i){
    console.log(this.media_in);
  }

  getMedia(){
    let mainimg = {
      type: 'image',
      image: this.siteUrl + this.project.project.image
    };
    let for_album = {
      src: this.siteUrl + this.project.project.image
    }
    this.media.push(mainimg);
    this.project.imageDetail.forEach(image=>{
      if(image.image && image.image.length > 0){
        image.type = 'image';
        image.image = this.siteUrl + image.image;
        image.title = image.title;
        this.media.push(image);
        this.media_in.push(image);
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

  openNewDialog(award) {
    let arr = ['ნასყიდობის ხელშეკრულება','მომსახურების ნასყიდობის ხელშეკრულება'];
    this.modalService.openDialog(this.viewRef, {
      // title: 'Some modal title',
      childComponent: InvestProjectPopupComponent,
      data: {
        id: award.id,
        pdf: award.pdf,
        title: arr[award.file_type],
      },
    });
  }

  openNewDialog2() {
    this.modalService.openDialog(this.viewRef, {
      // title: 'Some modal title',
      childComponent: CharityComponent,
      data: this.projectId
    });
  }

  constructor(private auth: AuthService, private lightbox: Lightbox, private langservice: LangsService, private ProjectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute, private modalService: ModalDialogService, private viewRef: ViewContainerRef) { }

  ngOnInit() {

    this.isAuthenticated = this.auth.isAuthenticated();
    this.activatedRoute.params.subscribe((params: Params) => {
        this.projectId = params["id"];
      });

    this.shortUrl = window.location.protocol + '//' + window.location.host + '/#/p/' + this.projectId;


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
    setTimeout(() => {
      this.breadcrumbs = {
        lastPage: this.titleBread,
        page: 'პროექტები',
        home: 'მთავარი',
        link: this.titleBread ? '/allproject' : '',
      }
    },1000);

  }

}
