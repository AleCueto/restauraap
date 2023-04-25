import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { AlertController, ModalController } from '@ionic/angular';
import { DishesService } from '../../services/dishes.service';
import { DishesDetailedComponent } from '../dishes-detailed/dishes-detailed.component';
import { ImageService } from '../../services/image.service';
import { error } from 'console';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.scss'],
})
export class DishListItemComponent implements OnInit {

  @Input() dishInput:Dish | undefined;

  imageUrl:string = ""

  constructor(
    private dishesService:DishesService,
    private alert:AlertController,
    private modal:ModalController,
    public imageService:ImageService,
    private userService:UserService

  ) { }

  ngOnInit() {
    if(this.dishInput){
      // console.log(this.imageService.getImageUrlByName(this.dishInput?.image))

      this.imageService.getImageUrlByName(this.dishInput.image).then(
        (url) => {
          console.log(url)
          this.imageUrl = url
        }).catch((error) => console.log(error))
    }

  }


  async deleteDish(dish:Dish){
    console.log("rfwe");
    await this.dishesService.deleteDish(dish);
  }

  
  async onDeleteAlert(dish:Dish) {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar este plato?',
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
            await this.deleteDish(dish)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presentDishForm(dish: Dish | null) {
    const modal = await this.modal.create({
      component: DishesDetailedComponent,
      componentProps: {
        dish: dish
      },
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            console.log(result.data.dish)
            this.dishesService.addDish(result.data.dish);
            break;
          case 'Edit':
            result.data.dish.id = dish?.id;
            this.dishesService.editDish(result.data.dish);
            break;
          default:
        }
      }
    });
  }


  onEditDish(dish:Dish){
    this.presentDishForm(dish);
  }

}
