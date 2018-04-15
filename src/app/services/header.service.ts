import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderService {

  getHeader(lng): Observable<any>{
    return this.http.get<any>('http://investme.testme.ge/api/header',{
      headers: {
        'X-App-Locale': lng,
      }
    });
  }

  constructor(public http: HttpClient) { }

}
