import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Dish } from '../../models/dish.model';
import { Subscription, throwError } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-dishes-detailed',
  templateUrl: './dishes-detailed.component.html',
  styleUrls: ['./dishes-detailed.component.scss'],
})
export class DishesDetailedComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  images: string[] = [];

  @Input('dish') set dish(dish:Dish){
    if(dish){
      // this.form.controls['id'].setValue(dish.id);
      this.form.controls['name'].setValue(dish.name);
      this.form.controls['price'].setValue(dish.price);
      this.form.controls['image'].setValue(dish.image);
      this.mode = "Edit";
    }
  }

  subsr:Subscription;
  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
    private imagesService:ImageService,
  ) {
    this.subsr = this.imagesService.images$.subscribe(data=>this.images = data);


    this.form = this.fb.group({
      name:['', [Validators.required]],
      price:['', [Validators.required]],
      image:['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.imagesService.getImages();
  }

  onSubmit(){
    this.modal.dismiss({dish: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result:any){
    this.modal.dismiss(null, 'cancel');
  }

  uploadImage($event:any){
    this.imagesService.uploadImage($event)
  }

  getImages(){
    return this.images
  }

}
