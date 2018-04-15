import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {

  uploadProfilePic(file,cb){
    var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = ()=>{
    if(this.auth.isAuthenticated()){
      let authToken = this.auth.getToken();
      const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
      return this.http.post<any>("http://investme.testme.ge/api/profile/uploadImage",{image: reader.result, type: file.type},{
        headers: headers
      }).subscribe(user => {
        cb(user);
      });
    }
  }
  }

  changePassword(post){
    if(this.auth.isAuthenticated()){
      let authToken = this.auth.getToken();
      const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
      return this.http.post<any>("http://investme.testme.ge/api/profile/changePassword",post,{
        headers: headers
      });
    }
  }

  editProfile(post){
    if(this.auth.isAuthenticated()){
      let authToken = this.auth.getToken();
      const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
      return this.http.post<any>("http://investme.testme.ge/api/profile",post,{
        headers: headers
      });
    }
  }

  getTranslations(){
    return this.http.get<any>("http://investme.testme.ge/api/profile");
  }

  constructor(private auth: AuthService, private http: HttpClient) { }

}
