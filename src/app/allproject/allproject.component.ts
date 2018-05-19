import { Component, OnInit } from '@angular/core';
import { LangsService } from '../services/langs.service';
import { ProjectService } from '../services/project.service';
import { Router, ActivatedRoute, Params} from "@angular/router";
import  * as $  from 'jquery';

@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.scss']
})
export class AllprojectComponent implements OnInit {

  siteLang: any;
  siteUrl = 'https://back.investme.ge';
  translations: any;

  breadcrumbs: object;

  hasquery: boolean;

  paginate = [];

  categories: any;
  projects: any;
  interests = [];
  totalPages: number;
  startPage: number;
  endPage: number;

  filters: object = {
    category: null,
    interests: [],
    page: 1,
    sort: "publish_date-desc"
  }

  getAllProject(){
    this.ProjectService.getAllProject(this.siteLang, this.filters["page"]).subscribe(res=>{
      console.log(res);
      this.categories = res.categories;
      if(!this.hasquery){
        this.projects = res.projects.data;
      }
      this.translations = res.translations;
      this.interests = res.interests;

      this.totalPages = res.projects.total;
      this.endPage = res.projects.last_page;
      // this.startPage = res.projects.


      this.pagination();

      this.interests.forEach(i=>{
        this.filters["interests"].forEach(j=>{
          if(i.id == j){
            i.selected = true;
          }
        })
      });
    });
  }

  prevPage(){
    if(this.filters["page"] > 1){
      this.filters["page"]--;
    }

    this.navigate();
  }

  nextPage(){
    if(this.filters["page"] < this.paginate.length){
      this.filters["page"]++;
    }

    this.navigate();
  }

  filterProjects(){
    this.ProjectService.filterProjects(this.siteLang, this.filters).subscribe(res=>{
      var data = [];
      this.totalPages = res.projects.last_page;
      this.endPage = res.projects.last_page;
      for(var i in res.projects.data){
        data.push(res.projects.data[i]);
      }
      this.projects = data;
      this.pagination();
    });
  }

  selectCategory(category){
    this.filters["category"] = category.id;
    this.filters["page"]= 1;
    this.navigate();
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

  navigate(){
    this.router.navigate([], {
        queryParams: {
          category: this.filters["category"],
          interests: this.filters["interests"].toString(),
          sort: this.filters["sort"],
          page: this.filters["page"]
        }
    });
    console.log(this.filters);
    this.filterProjects();
  }

  selectInterests(interest){
    if(interest.selected){
      interest.selected = false;
    }else{
      interest.selected = true;
    }
    this.filters["interests"] = [];
    for(var i = 0; i < this.interests.length; i++){
      if(this.interests[i].selected){
        this.filters["interests"].push(this.interests[i].id);
      }
    }
    this.navigate();
  }

  getPage(page){
    this.filters["page"] = page;
    this.navigate();
  }

  pagination(){
    if (this.totalPages <= 10) {
            // less than 10 total pages so show all
            this.startPage = 1;
            this.endPage = this.totalPages;

      }else{
        if (this.filters["page"] <= 6) {
              this.startPage = 1;
              this.endPage = 10;
          } else if (this.filters["page"] + 4 >= this.totalPages) {
              this.startPage = this.totalPages - 9;
              this.endPage = this.totalPages;
          } else {
              this.startPage = this.filters["page"] - 5;
              this.endPage = this.filters["page"] + 4;
          }
      }

      this.paginate = [];
      for(var i = this.startPage; i <= this.endPage; i++){
        this.paginate.push(i);
      }
  }


  constructor(private langservice: LangsService, private ProjectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.siteLang = this.langservice.getLang();
    document.addEventListener('langchanged',()=>{
      this.siteLang = this.langservice.getLang();
    });


    this.hasquery = window.location.href.split('?')[1] == undefined ? false : true;

    this.getAllProject();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.filters["category"] = (params['category']) ? params['category'] : null;
        this.filters["page"] = (params['page']) ? params['page'] : 1;
        this.filters["sort"] = (params['sort']) ? params['sort'] : 'publish_date-desc';
        this.filters["interests"] = (params['interests']) ? params['interests'].split(',') : [];
      });

      if(this.hasquery){
        console.log();
        this.navigate();
      }

    this.breadcrumbs = {
      page: 'პროექტები',
      home: 'მთავარი'
    }

  }

}
