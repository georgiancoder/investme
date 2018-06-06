import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeComponent } from 'angularx-youtube';

@Component({
  selector: 'app-thumbs-slider',
  templateUrl: './thumbs-slider.component.html',
  styleUrls: ['./thumbs-slider.component.scss','./thumbs-slider.responsive.scss']
})
export class ThumbsSliderComponent implements OnInit, OnDestroy {
  @Input() media: any;
  interval:any;
  slideWidth: number = 85;
  slideGapSize: number = 10;
  thumbsSliderPosition: number = 0;
  thumbsSliderCurItem: any;
  slideCounter: number = 0;
  slideTime: number = 5000;
  lastViewItemIndex: number = 4;
  itemsInView: number = 5;

  playMode: boolean = false;

  currVideolink: any;

  currentSlide: any;
  player: any;

  next(){
    if(this.slideCounter < this.media.length-1)
      this.slideCounter++;
      else
      this.slideCounter = 0;
    this.slide();
    this.currentSlide = this.media[this.slideCounter];
  }

  prev(){
    if(this.slideCounter > 0)
      this.slideCounter--;
    else
      this.slideCounter = this.media.length - 1;

    this.slide();
    this.currentSlide = this.media[this.slideCounter];
  }

  onReady(player): void {
        this.player = player;
        console.log(this.player)
        this.player.setSize(520,450);
    }

    onChange(event): void {
        if(event.data == 1){
          clearInterval(this.interval);
        }
        else if(event.data == 2){
          this.playMode = false;
          this.interval = setInterval(()=>{
            this.next();
          },this.slideTime);
        }
    }


  slide(){
    if(this.slideCounter > this.lastViewItemIndex){
      this.lastViewItemIndex = this.slideCounter;
      this.thumbsSliderPosition = (this.lastViewItemIndex+1) - this.itemsInView;
    }
    if(this.slideCounter < (this.lastViewItemIndex+1) - this.itemsInView){
      this.lastViewItemIndex = this.slideCounter + (this.itemsInView-1);
      this.thumbsSliderPosition = (this.lastViewItemIndex+1) - this.itemsInView;
    }
  }

  selectSlide(i){
    this.slideCounter = i;
    this.currentSlide = this.media[i];
  }

  playVideo(){
    this.playMode = true;
    clearInterval(this.interval);
  }

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.currentSlide = this.media[0];
    this.interval = setInterval(()=>{
      this.next();
    },this.slideTime);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }

}
