import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class FooterService {


  getFooter(lng): Observable<any>{
    return this.http.get<any>("https://back.investme.ge/api/footer",{
      headers: {
        'X-App-Locale': lng,
      }
    });
  }

  constructor( private http: HttpClient ) { }

}
