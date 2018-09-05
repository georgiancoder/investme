import { Injectable } from '@angular/core';
import { PROJECTS } from '../projects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable()
export class SupportersService {

  getSupporters(projectId, lng){
    let authToken = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken, 'X-App-Locale': lng});
    return this.http.get<any>("http://back.investme.ge/api/myprojects/"+ projectId +"/supporters",{
      headers: headers
    });
  }

  constructor(private http: HttpClient, private auth: AuthService) { }
}
