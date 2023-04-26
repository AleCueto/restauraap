import { Component, Input, OnInit } from '@angular/core';
import { Waiter } from '../../models/waiter.model';
import { WaitersService } from '../../services/waiters.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { WaitersDetailedComponent } from '../waiters-detailed/waiters-detailed.component';

@Component({
  selector: 'app-waiter-list-item',
  templateUrl: './waiter-list-item.component.html',
  styleUrls: ['./waiter-list-item.component.scss'],
})
export class WaiterListItemComponent implements OnInit {

  @Input() waiterInput:Waiter | undefined;

  imageUrl:string = ""

  constructor(
    private waiterService:WaitersService,
    private alert:AlertController,
    private modal:ModalController,
    public imageService:ImageService,
    private userService:UserService

  ) { }

  ngOnInit() {
    if(this.waiterInput){
      // console.log(this.imageService.getImageUrlByName(this.dishInput?.image))

      this.imageService.getImageUrlByName(this.waiterInput.picture).then(
        (url) => {
          console.log(url)
          this.imageUrl = url
        }).catch((error) => console.log(error))
    }

  }


  async deleteWaiter(waiter:Waiter){
    console.log("rfwe");
    await this.waiterService.deleteWaiter(waiter);
  }

  
  async onDeleteAlert(waiter:Waiter) {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar este camarero?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: async () => {
            await this.deleteWaiter(waiter)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
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
            console.log(result.data.waiter)
            this.waiterService.addWaiter(result.data.waiter);
            break;
          case 'Edit':
            result.data.waiter.id = waiter?.id;
            this.waiterService.editWaiter(result.data.waiter);
            break;
          default:
        }
      }
    });
  }


  onEditWaiter(waiter:Waiter){
    this.presentWaiterForm(waiter);
  }

}
