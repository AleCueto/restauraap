import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'pages' + ".home" , url: '/home', icon: 'home' },
    { title: 'pages' + ".dish" , url: '/folder/Dish', icon: 'pizza' },
    { title: 'pages' + ".table" , url: '/folder/Table', icon: 'fast-food' },
    { title: 'pages' + ".waiter" , url: '/folder/Waiter', icon: 'people' },
    { title: 'pages' + ".commands" , url: '/folder/commands', icon: 'book' },
    { title: 'pages' + ".about" , url: '/folder/About', icon: 'star' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [/*'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'*/];
  constructor(
    private translate:TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  changeLanguage(lng:string){
    this.translate.setDefaultLang(lng)
  }


}
