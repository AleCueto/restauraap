import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './core/services/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { AlertController, IonRouterOutlet, MenuController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'pages' + ".home" , url: '/folder/Home', icon: 'home' },
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
    private router:Router,
    private menuController: MenuController,
    private alert: AlertController
  ) {
    this.translate.setDefaultLang('en');
  }

  changeLanguage(lng:string){
    this.translate.setDefaultLang(lng)
  }

  logout(){
    this.closeMenuToggle();
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  
  closeMenuToggle() {
    this.menuController.toggle();
  }

  deleteAccount(){
    this.closeMenuToggle();
    this.router.navigate(['/login']);
    this.userService.deleteAccount();
  }


  
  async onDeleteAlert() {
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('generic.warning2')),
      message: await lastValueFrom(this.translate.get('account.warning')),
      buttons: [
        {
          text: await lastValueFrom(this.translate.get('generic.cancel')),
          role: 'cancel',
          handler: () => {
            console.log("Operación cancelada");
          },
        },
        {
          text: await lastValueFrom(this.translate.get('generic.delete')),
          role: 'confirm',
          handler: async () => {
            await this.deleteAccount();
          },
        },
      ],
    });
  
    await alert.present();
  }
}
