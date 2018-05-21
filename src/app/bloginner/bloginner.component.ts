import { Component, OnInit } from '@angular/core';
import { BlogService } from "../services/blog.service";
import { LangsService } from '../services/langs.service';
import { Router, ActivatedRoute, Params} from "@angular/router";
import {MediaService} from "../services/media.service";

@Component({
  selector: 'app-bloginner',
  templateUrl: './bloginner.component.html',
  styleUrls: ['./bloginner.component.scss']
})
export class BloginnerComponent implements OnInit {

  id: number;
  siteUrl: string = "https://back.investme.ge";
  lang:string;
  blog:any;

  //change remote


  breadcrumbs: object;

  getBlog(){
    this.blogService.getBlog(this.lang,this.id).subscribe(blog=>{
      this.blog = blog;
    })
  }

  constructor(private langsservice: LangsService, private blogService: BlogService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
    this.lang = this.langsservice.getLang();
    this.getBlog();
    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();
      this.getBlog();
    });

    this.breadcrumbs = {
      page: 'ბლოგი',
      home: 'მთავარი'
    }
  }

}
