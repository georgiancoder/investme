import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { LangsService } from '../services/langs.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  siteUrl:string = "http://investme.testme.ge";

  lang:string;

  medias:any;

  breadcrumbs: object;

  constructor(private langsservice: LangsService, private mediaService: MediaService) { }

  getMediaList(){
    this.mediaService.getMediaList(this.lang).subscribe(medias=>{
        this.medias = medias;
    });
  }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.getMediaList();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.getMediaList();
    });

    this.breadcrumbs = {
      page: 'მედია ჩვენ შესახებ',
      home: 'მთავარი'
    }
  }

}
