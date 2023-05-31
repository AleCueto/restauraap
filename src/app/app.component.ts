import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './core/services/user.service';
import { Router } from '@angular/router';

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
    { title: 'pages' + ".commands" , url: '/folder/Commands', icon: 'book' },
    { title: 'pages' + ".about" , url: '/folder/About', icon: 'star' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [/*'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'*/];
  constructor(
    private translate:TranslateService,
    private userService:UserService,
    private router:Router
  ) {
    this.translate.setDefaultLang('en');
  }

  changeLanguage(lng:string){
    this.translate.setDefaultLang(lng)
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/folder/register']);
  }

}
