import { Component, OnInit } from '@angular/core';
import { LangsService } from '../services/langs.service';
import { ProjectService } from '../services/project.service';
import { Router, ActivatedRoute, Params} from "@angular/router";
import  * as $  from 'jquery';

@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.scss','./allproject.responsive.scss']
})
export class AllprojectComponent implements OnInit {

  siteLang: any;
  siteUrl = 'https://back.investme.ge';
  translations: any;

  breadcrumbs: object;

  hasquery: boolean;

  p:number = 1;

  categories: any;
  projects: any;
  interests = [];
  totalPages: number;
  totalCount: number;

  filters: object = {
    category: null,
    interests: [],
    page: 1,
    sort: "publish_date-desc"
  };

  pageChanged(event) {
    this.p = event;
    console.log(this.p);
    this.router.navigate(['allproject'],{queryParams:
        {
          page: this.p,
          category: this.filters["category"],
          interests: this.filters["interests"].toString(),
          sort: this.filters["sort"]
        }
    });
  }

  changeFilterClass(){
    var filtBtnCont = $(".filterBtn-container");
    var filtCont = $(".filter");

    if(filtBtnCont.hasClass("closed")){
        filtCont.css("left","0px");
        filtBtnCont.css("left","270px");
        filtBtnCont.removeClass("closed");
    }
    else {
        filtCont.css("left","-270px");
        filtBtnCont.css("left","0px");
        filtBtnCont.addClass("closed");
    }
  }

  getAllProject(){
    this.ProjectService.getAllProject(this.siteLang, this.filters["page"]).subscribe(res=>{
      this.totalCount = res.projects.total;
      this.categories = res.categories;
      // this.projects = res.projects.data;
      this.translations = res.translations;
      this.interests = res.interests;

      // this.totalPages = res.projects.total;


      this.interests.forEach(i=>{
        this.filters["interests"].forEach(j=>{
          if(i.id == j){
            i.selected = true;
          }
        })
      });
    });
  }

  filterProjects(){
    this.ProjectService.filterProjects(this.siteLang, this.filters).subscribe(res=>{
      console.log(res);
      this.totalPages = res.projects.length;
      // var data = [];
      // for(var i in res.projects){
      //   data.push(res.projects[i]);
      // }
      this.projects = res.projects;
    });
  }

  selectCategory(category){
    if(category != ''){
      this.filters["category"] = category.id;
      this.filters["page"]= 1;
      this.navigate();
    }else{
      this.filters["category"] = null;
      this.filterProjects();
      this.router.navigate(['allproject']);
    }
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

  getInnerProject(id,event){
    if(event.target.classList.contains('mainpic')){
      this.router.navigate(['project/'+id]);
    }
  }


  constructor(private langservice: LangsService, private ProjectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.siteLang = this.langservice.getLang();
    document.addEventListener('langchanged',()=>{
      this.siteLang = this.langservice.getLang();
    });

    this.activatedRoute.queryParams.subscribe((params)=>{
      let category = {
        id:params.category
      };
      this.selectCategory(category);
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
        this.navigate();
      }

    this.breadcrumbs = {
      page: 'პროექტები',
      home: 'მთავარი'
    }

  }

}
