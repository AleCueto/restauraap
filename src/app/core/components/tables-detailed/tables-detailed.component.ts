import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Table } from '../../models/table.model';
import { WaitersService } from '../../services/waiters.service';
import { Waiter } from '../../models/waiter.model';

@Component({
  selector: 'app-tables-detailed',
  templateUrl: './tables-detailed.component.html',
  styleUrls: ['./tables-detailed.component.scss'],
})
export class TablesDetailedComponent implements OnInit {

  waiters: Waiter[] | undefined

  actualWaiter:any
  newWaiter:any


  form:FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('table') set table(table:Table){

    if(table){
      // this.form.controls['id'].setValue(table.id);
      this.form.controls['number'].setValue(table.number);
      this.form.controls['info'].setValue(table.info);
      this.form.controls['needsAttention'].setValue(table.needsAttention);
      this.form.controls['idWaiter'].setValue(table.idWaiter);
      this.mode = "Edit";

      //Save the waiter we had to substract a table attended in case in submit is another
      if(table.idWaiter!= ""){

        this.waitersService.getWaiterById(table!.idWaiter).subscribe(
          waiter => {
            this.actualWaiter = waiter;
            this.actualWaiter.id = table.idWaiter
            console.log("ACTUAL WAITER: " + this.actualWaiter.id)
          },
          error => console.log(error)
          );
        }
      }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
    private waitersService:WaitersService
  ) {

    this.form = this.fb.group({
      number:['', [Validators.required]],
      info:['', ],
      needsAttention:[true, ],
      idWaiter:['', ]
    });

  }

  ngOnInit() {
    this.waitersService.getWaiters().subscribe(waiters =>{
      this.waiters = waiters;
    })
  }

  onSubmit(){

    if(this.actualWaiter){
      if(this.form.value.idWaiter != this.actualWaiter){
        this.actualWaiter.tablesAttended--;
        //RESTAR
        if(this.actualWaiter.tablesAttended <= 0){
          console.log(this.actualWaiter.tablesAttended)
          this.actualWaiter.isBusy = false;
        }
    
        this.waitersService.editWaiter(this.actualWaiter);
    
      }
    }
    
    this.waitersService.getWaiterById(this.form.value.idWaiter).subscribe(
      waiter => {
        console.log("ewrfewregrweewg: " + waiter)
        this.newWaiter = waiter;
        this.newWaiter.id = this.form.value.idWaiter
        console.log("NEW WAITER "  +  this.newWaiter.id)
        this.newWaiter.tablesAttended ++;
        this.newWaiter.isBusy = true
        this.waitersService.editWaiter(this.newWaiter)
        },
        error => console.log(error)
    );

    this.modal.dismiss({table: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result:any){
    this.modal.dismiss(null, 'cancel');
  }


}
