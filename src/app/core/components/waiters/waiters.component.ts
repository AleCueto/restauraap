import { Component, OnInit } from '@angular/core';
import { Waiter } from '../../models/waiter.model';
import { AlertController, ModalController } from '@ionic/angular';
import { WaitersService } from '../../services/waiters.service';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { WaitersDetailedComponent } from '../waiters-detailed/waiters-detailed.component';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.scss'],
})
export class WaitersComponent implements OnInit {

  waiters: Waiter[] | undefined;

  constructor(
    private modal:ModalController,
    private alert:AlertController,
    private waitersService:WaitersService,
    private imageService:ImageService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.waitersService.getWaiters().subscribe(waiters =>{
      this.waiters = waiters;
      this.waiters = this.waiters?.filter((waiter) => this.checkWaiterBelong(waiter))
    })


  }



  async presentWaiterForm(waiter: Waiter | null) {
    const modal = await this.modal.create({
      component: WaitersDetailedComponent,
      componentProps: {
        waiter: waiter
      },
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.waitersService.addWaiter(result.data.waiter);
            break;
          case 'Edit':
            result.data.waiter.id = waiter?.id;
            this.waitersService.editWaiter(result.data.waiter);
            break;
          default:
        }
      }
    });
  }

  onNewWaiter(){
    this.presentWaiterForm(null);  
  }

  checkWaiterBelong(waiter:Waiter){
    if(waiter.idRestaurant == this.userService.getUid()){
      // console.log(waiter);
      return true
    } else{
      // console.log("waiter.idRestaurant: " + waiter.idRestaurant  + "||" + "user UID: " + this.userService.getUid())
      return false
    }
  }

}
