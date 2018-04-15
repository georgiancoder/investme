import { Injectable } from '@angular/core';
import { CATEGORIES } from '../categories';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CategorieService {

  getCategories(): Observable<any>{
    return of(CATEGORIES);
  }

  constructor() { }


}
