import { Component, OnInit } from '@angular/core';
import { DishesDetailedComponent } from '../dishes-detailed/dishes-detailed.component';
import { Dish } from '../../models/dish.model';
import { AlertController, ModalController } from '@ionic/angular';
import { DishesService } from '../../services/dishes.service';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {

  dishes: Dish[] | undefined;

  constructor(
    private modal:ModalController,
    private alert:AlertController,
    private dishesService:DishesService,
    private imageService:ImageService,
    private userService:UserService
  ) { 

    

  }

  ngOnInit() {
    this.dishesService.getDishes().subscribe(dishes =>{
      this.dishes = dishes;
      this.dishes = this.dishes?.filter((dish) => this.checkDishBelong(dish))

    })

  }

  getImageByDish(dish:Dish){
    // console.log("Image url:" + this.imageService.getImageUrlByName(dish.image));
    // await this.imageService.getImageUrlByName(dish.image);

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

  onNewDish(){
    this.presentDishForm(null);  
  }

  checkDishBelong(dish:Dish){
    if(dish.idRestaurant == this.userService.getUid()){
      return true
    } else{
      // console.log("dish.idRestaurant: " + dish.idRestaurant  + "||" + "user UID: " + this.userService.getUid())
      return false
    }
  }


}
