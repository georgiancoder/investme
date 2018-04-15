import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../services/project.service';
import  * as $  from 'jquery';


import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-project-slider',
  templateUrl: './project-slider.component.html',
  styleUrls: ['./project-slider.component.scss']
})
export class ProjectSliderComponent implements OnInit {

  siteUrl = "http://investme.testme.ge";

  @Input() projects: any;

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

  constructor(private projectservice: ProjectService) { }

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

    this.currentProject = this.projects[0];
    this.nextBtnShowHide = (this.projects.length - Math.abs(this.slideWidth / 400)) > 5 ? 'next show' : 'next';
    this.prevBtnShowHide = this.slideWidth < 0 ? 'prev show' : 'prev';
    this.thumbsWidth = this.projects.length * 400;

    this.sliderInt = setInterval(() => {
      this.slider();
    },this.sliderInterval);

    $().ready(function(){

    });



  }

  ngAfterViewInit(){

  }

}
