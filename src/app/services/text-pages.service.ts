import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TextPagesService {

  constructor(private http: HttpClient){}

  about(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/about",{
      headers: headers
    });
  }

  privacy(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/privacy",{
      headers: headers
    });
  }

  rules(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/rule",{
      headers: headers
    });
  }

  contact(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/contact",{
      headers: headers
    });
  }

  faq(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/faq",{
      headers: headers
    });
  }

  getPageData(page,lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/" + page,{
      headers: headers
    });
  }

  getPageTitles(data){
    let regex = /<h[0-6]\b[^>]*>(.*?)<\/h[0-6]>/gi;
    return data.match(regex);
  }

  markHeadings(data){
    let counter = 0;
    let regex = /<h[0-6]+(>|.*?[^?]>)/gi;
     let newdata = data.replace(regex, function(match, p1, p2) {
      match = `${match.substr(0,match.length-1)} id="heading${counter}">`;
      counter++;
      return match;
    });

     return newdata;
  }




}
