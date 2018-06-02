import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  getEventList(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/medias",{
      headers: headers
    });
  }

  getEvent(lng, id){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/medias/"+id,{
      headers: headers
    });
  }
}
