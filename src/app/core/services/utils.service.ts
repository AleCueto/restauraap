import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  removePrefix(str: string, pref: string): string {
    if (str.startsWith(pref)) {
      return str.slice(pref.length);
    } else {
      return str;
    }
  }

}
