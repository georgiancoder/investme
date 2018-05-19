import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {LangsService} from '../services/langs.service';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  siteUrl: string = "http://investme.testme.ge";

  lang: string;

  p: number = 1;

  pageChanged(event) {
    this.p = event;
    this.router.navigate(['media'],{queryParams: {page: this.p}});
  }

  medias: any;

  breadcrumbs: object;

  constructor(private langsservice: LangsService, private mediaService: MediaService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  getMediaList() {
    this.mediaService.getMediaList(this.lang).subscribe(medias => {
      this.medias = medias;
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

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.p = (params['page']) ? params['page'] : 1;
    });
  }

}
