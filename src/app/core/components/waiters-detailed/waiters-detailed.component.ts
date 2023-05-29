import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Waiter } from '../../models/waiter.model';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-waiters-detailed',
  templateUrl: './waiters-detailed.component.html',
  styleUrls: ['./waiters-detailed.component.scss'],
})
export class WaitersDetailedComponent implements OnInit {

  
  form:FormGroup;
  mode:"New" | "Edit" = "New";
  images: string[] = [];

  @Input('waiter') set waiter(waiter:Waiter){
    if(waiter){
      // this.form.controls['id'].setValue(dish.id);
      this.form.controls['name'].setValue(waiter.name);
      this.form.controls['surname'].setValue(waiter.surname);
      this.form.controls['isBusy'].setValue(waiter.isBusy);
      this.form.controls['enabled'].setValue(waiter.enabled);
      this.form.controls['picture'].setValue(waiter.picture);
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
      surname:['', [Validators.required]],
      picture:['', [Validators.required]],
      isBusy:[],
      enabled:[],
    });

  }

  ngOnInit() {
    this.imagesService.getImages();
  }

  onSubmit(){
    this.modal.dismiss({waiter: this.form.value, mode:this.mode}, 'ok');
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
