import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProjectService } from '../services/project.service';
import  * as $  from 'jquery';
import { LangsService } from '../services/langs.service';


import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-project-slider',
  templateUrl: './project-slider.component.html',
  styleUrls: ['./project-slider.component.scss','./project-slider.responsive.scss']
})
export class ProjectSliderComponent implements OnInit {

  siteUrl = "https://back.investme.ge";

  lang: string = '';

  @Input() projects: any;

  @Output() result = new EventEmitter();

  sliderInterval: number = 6000;
  srchbtntgl: boolean = false;
  sliderInt: any;
  thumbsWidth: any;
  slideWidth: number = 0;
  nextBtnShowHide: string;
  prevBtnShowHide: string;
  filters: any[];
  currentProject: any;
  activeSlide: number = 0;
  progress: number = 0;
  progressPrev: number = 0;
  progressInt: any;

  constructor(private projectservice: ProjectService, private langsservice: LangsService) { }

  nextSlide(): void{
    if( (this.projects.length - Math.abs(this.slideWidth / 300)) > 3 ){
      this.activeSlide++;
      this.slideWidth-=400;
      this.nextBtnShowHide = (this.projects.length - Math.abs(this.slideWidth / 400)) > 3 ? 'next show' : 'next';
      this.prevBtnShowHide = this.slideWidth < 0 ? 'prev show' : 'prev';
      this.progress = this.activeSlide / (this.projects.length-1) * 100;
    }
  }

  selectProject(project, index) {
    this.currentProject = project;
    this.activeSlide = index;
    this.progress = this.activeSlide / (this.projects.length-1) * 100;
  }

  getNewProjects(){
    this.projectservice.getNewProjects(this.lang).subscribe(projects =>{
      this.result.emit(projects.projects);
      this.currentProject = projects.projects[0];
    })
  }

  getPopularProjects(){
    this.projectservice.getPopularProjects(this.lang).subscribe(projects =>{
      this.result.emit(projects.projects);
      this.currentProject = projects.projects[0];
    })
  }

  prevSlide(): void{
    if( this.slideWidth < 0 ){
      this.activeSlide--;
      this.slideWidth+= 400;
      this.nextBtnShowHide = (this.projects.length - Math.abs(this.slideWidth / 400)) > 3 ? 'next show' : 'next';
      this.prevBtnShowHide = this.slideWidth < 0 ? 'prev show' : 'prev';
      this.progress = this.activeSlide / (this.projects.length-1) * 100;
    }
  }


  slider(): void{
    if(this.activeSlide < this.projects.length-1){
      this.activeSlide++;
      this.currentProject = this.projects[this.activeSlide];
    } else if(this.activeSlide == this.projects.length - 1){
      this.activeSlide=0;
      this.slideWidth = 0;
      this.currentProject = this.projects[this.activeSlide];
      this.nextBtnShowHide = (this.projects.length - Math.abs(this.slideWidth / 400)) > 3 ? 'next show' : 'next';
      this.prevBtnShowHide = this.slideWidth < 0 ? 'prev show' : 'prev';
    }
    if(this.activeSlide == Math.abs(this.slideWidth) / 400 + 3){
      if( (this.projects.length - Math.abs(this.slideWidth / 300)) > 3 ){
        this.slideWidth-=400;
        this.nextBtnShowHide = (this.projects.length - Math.abs(this.slideWidth / 400)) > 3 ? 'next show' : 'next';
        this.prevBtnShowHide = this.slideWidth < 0 ? 'prev show' : 'prev';
      }
    }


    this.progress = this.activeSlide / (this.projects.length-1) * 100;
  }


  ngOnInit() {

    console.log(this.projects);
    this.lang = this.langsservice.getLang();
    this.currentProject = this.projects[0];
    this.nextBtnShowHide = (this.projects.length - Math.abs(this.slideWidth / 400)) > 5 ? 'next show' : 'next';
    this.prevBtnShowHide = this.slideWidth < 0 ? 'prev show' : 'prev';
    this.thumbsWidth = this.projects.length * 400;

    this.sliderInt = setInterval(() => {
      this.slider();
    },this.sliderInterval);

    document.addEventListener('langchanged',(e)=>{
      this.lang = this.langsservice.getLang();

    });

    $().ready(function(){

    });



  }

  ngAfterViewInit(){

  }

}
