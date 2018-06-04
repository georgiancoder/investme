import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {LangsService} from '../services/langs.service';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss','./media.responsive.scss']
})
export class MediaComponent implements OnInit {

  siteUrl: string = "https://back.investme.ge";

  lang: string;


  medias: any;

  breadcrumbs: object;

  constructor(private langsservice: LangsService, private mediaService: MediaService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  getMediaList() {
    this.mediaService.getMediaList(this.lang).subscribe(medias => {
      this.medias = medias;
      console.log(this.medias)
    });
  }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.getMediaList();
    document.addEventListener('langchanged', (e) => {
      this.lang = this.langsservice.getLang();
      this.getMediaList();
    });

    this.breadcrumbs = {
      page: 'მედია ჩვენ შესახებ',
      home: 'მთავარი'
    }


  }

}
