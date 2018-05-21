import {Component, OnInit} from '@angular/core';
import {BlogService} from "../services/blog.service";
import {LangsService} from '../services/langs.service';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  siteUrl: string = "https://back.investme.ge";

  lang: string;


  blogs: any;

  breadcrumbs: object;

  constructor(private langsservice: LangsService, private blogService: BlogService, private router: Router, private activatedRoute: ActivatedRoute) { }

  getBlogList() {
    this.blogService.getBlogList(this.lang).subscribe(blogs => {
      this.blogs = blogs;
    });
  }

  ngOnInit() {
    this.lang = this.langsservice.getLang();
    this.getBlogList();
    document.addEventListener('langchanged', (e) => {
      this.lang = this.langsservice.getLang();
      this.getBlogList();
    });

    this.breadcrumbs = {
      page: 'ბლოგი',
      home: 'მთავარი'
    }

  }
}
