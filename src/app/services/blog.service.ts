import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogList(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/blogs",{
      headers: headers
    });
  }

  getBlog(lng,id){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/blogs/"+id,{
      headers: headers
    });
  }

}
