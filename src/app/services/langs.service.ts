import { Injectable } from '@angular/core';

@Injectable()
export class LangsService {

  constructor() { }

  setLang(lng){
    localStorage.setItem('lang',lng);
  }

  getLang(){
    var lng = localStorage.getItem('lang');
    if(!lng){
      lng = 'ka';
    }

    return lng;
  }

}
