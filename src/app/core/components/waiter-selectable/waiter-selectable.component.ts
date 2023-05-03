import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Waiter } from '../../models/waiter.model';
import { WaitersService } from '../../services/waiters.service';
import { IonAccordionGroup } from '@ionic/angular';
import { Table } from '../../models/table.model';
import { map } from 'rxjs';

export const WAITER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WaiterSelectableComponent),
  multi: true
};


@Component({
  selector: 'app-waiter-selectable',
  templateUrl: './waiter-selectable.component.html',
  styleUrls: ['./waiter-selectable.component.scss'],
  providers: [WAITER_PROFILE_VALUE_ACCESSOR]
})
export class WaiterSelectableComponent implements OnInit, ControlValueAccessor {

  waiters: Waiter[] | undefined


  propagateChange = (_: any) => { }
  itemSelected:Waiter | undefined;
  form_edit:FormGroup | undefined;

  constructor(private waitersService:WaitersService) { }


  writeValue(obj: any): void {

      // this.itemSelected = this.getWaiters().find(waiter => waiter.id = obj);

      this.getWaiters().pipe(
        map((waitersArray: Waiter[]) => waitersArray.find(value => value.id === obj))
      ).subscribe((foundValue?: Waiter) => {
        console.log(foundValue?.id);
        this.itemSelected = foundValue
      });

    }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  selectItem(waiterSelected:Waiter, accordion:IonAccordionGroup){
    this.itemSelected = waiterSelected
    accordion.value='';
    this.propagateChange(this.itemSelected.id);
  }

  ngOnInit() {

    this.waitersService.getWaiters().subscribe(waiters =>{
      this.waiters = waiters;

    })

  }

  getWaiters(){
    return this.waitersService.getWaiters()
  }




}
