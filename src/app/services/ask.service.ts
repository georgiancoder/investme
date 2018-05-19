import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AskService {

  ask(data): Observable<any>{
    return this.http.post('http://investme.testme.ge/api/addQuest',data);
  }
  constructor(private http: HttpClient){}
}
