import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Table } from '../../models/table.model';

@Component({
  selector: 'app-tables-detailed',
  templateUrl: './tables-detailed.component.html',
  styleUrls: ['./tables-detailed.component.scss'],
})
export class TablesDetailedComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('table') set table(table:Table){
    if(table){
      // this.form.controls['id'].setValue(table.id);
      this.form.controls['number'].setValue(table.number);
      this.form.controls['info'].setValue(table.info);
      this.form.controls['isReserved'].setValue(table.isReserved);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
  ) {



    this.form = this.fb.group({
      number:['', [Validators.required]],
      info:['', [Validators.required]],
      isReserved:['', [Validators.required]],
    });

  }

  ngOnInit() {

  }

  onSubmit(){
    this.modal.dismiss({table: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result:any){
    this.modal.dismiss(null, 'cancel');
  }


}
