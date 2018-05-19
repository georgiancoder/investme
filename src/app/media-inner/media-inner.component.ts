import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { LangsService } from '../services/langs.service';
import { Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-media-inner',
  templateUrl: './media-inner.component.html',
  styleUrls: ['./media-inner.component.scss']
})
export class MediaInnerComponent implements OnInit {

  id: number;
  siteUrl: string = "https://back.investme.ge";
  lang:string;
  media:any;

  breadcrumbs: object;

  getMedia(){
    this.mediaService.getMedia(this.lang,this.id).subscribe(media=>{
      this.media = media;
    })
  }

  constructor(private langsservice: LangsService, private mediaService: MediaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params["id"];
      });
      this.lang = this.langsservice.getLang();
      this.getMedia();
      document.addEventListener('langchanged',(e)=>{
        this.lang = this.langsservice.getLang();
        this.getMedia();
      });

      this.breadcrumbs = {
        page: 'მედია ჩვენ შესახებ',
        home: 'მთავარი'
      }
  }

}
