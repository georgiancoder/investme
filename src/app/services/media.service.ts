import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MediaService {

  constructor(private http: HttpClient) { }

  getMediaList(lng){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/medias",{
      headers: headers
    });
  }

  getMedia(lng,id){
    const headers = new HttpHeaders({'X-App-Locale': lng});
    return this.http.get<any>("https://back.investme.ge/api/medias/"+id,{
      headers: headers
    });
  }

}
