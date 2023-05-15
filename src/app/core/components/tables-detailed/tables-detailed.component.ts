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
    }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
    private waitersService:WaitersService
  ) {



    this.form = this.fb.group({
      number:['', [Validators.required]],
      info:['', [Validators.required]],
      needsAttention:['', [Validators.required]],
      idWaiter:['', [Validators.required]]
    });

  }

  ngOnInit() {
    this.waitersService.getWaiters().subscribe(waiters =>{
      this.waiters = waiters;

    })
  }

  onSubmit(){
    this.modal.dismiss({table: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result:any){
    this.modal.dismiss(null, 'cancel');
  }


}
