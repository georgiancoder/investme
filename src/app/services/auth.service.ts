import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {

  userSetEvent: any;

  setToken(token,expiration){
      localStorage.setItem('token',token);
      localStorage.setItem('expiration',expiration);
    }

    getToken(){
      var token = localStorage.getItem('token');
      var expiration = localStorage.getItem('expiration');

      if (!token || !expiration) {
        return null;
      }

      if (Date.now() > parseInt(expiration)) {
        this.destroyToken();
        return null;
      } else {
          return token;
      }
    }

    destroyToken(){
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('user');

      localStorage.removeItem('mainInfo');
      localStorage.removeItem('failebi');
      localStorage.removeItem('jildoebi');
      localStorage.removeItem('members');
      localStorage.removeItem('finances');
    }

    logOut(){
      return this.http.post<any>("http://investme.testme.ge/api/logout",{});
    }

    isAuthenticated(){
      if (this.getToken())
        return true;
      else
        return false;
     }

     setAuthenticatedUser(cb){
       if(this.isAuthenticated()){
         let authToken = this.getToken();
         const headers = new HttpHeaders({'Authorization': 'Bearer '+ authToken});
         this.http.get<any>("http://investme.testme.ge/api/user",{
           headers: headers
         }).subscribe(user => {
           localStorage.removeItem('user');
           localStorage.setItem('user',JSON.stringify(user));
           cb();
         });
       }
     }

    removeAuthenticatedUser(){
      localStorage.removeItem('user');
    }

     getAuthenticatedUser(){
       return JSON.parse(localStorage.getItem('user'));
     }

  registration(post): Observable<any>{
    return this.http.post<any>("http://investme.testme.ge/api/register",post);
  }

  logIn(post): Observable<any>{
    return this.http.post<any>("http://investme.testme.ge/oauth/token",post);
  }



  constructor(private http: HttpClient) { }

}
