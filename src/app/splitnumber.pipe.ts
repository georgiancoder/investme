import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitnumber'
})
export class SplitnumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== undefined && value !== null) {
      // here we just remove the commas from value
      return value.toString().replace(",", " ");
    } else {
      return value;
    }
  }

}
