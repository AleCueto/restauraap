// Necessary imports
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Waiter } from '../../models/waiter.model';
import { WaitersService } from '../../services/waiters.service';
import { IonAccordionGroup } from '@ionic/angular';
import { Table } from '../../models/table.model';
import { map } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';

// Definition of the NG_VALUE_ACCESSOR provider for the component
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
  // Class variables
  waiters: Waiter[] | undefined;
  propagateChange = (_: any) => { }
  itemSelected: Waiter | undefined;
  itemSelectedUrl: string | undefined;
  form_edit: FormGroup | undefined;

  constructor(
    private waitersService: WaitersService,
    private imageService: ImageService,
    private userService: UserService
  ) { }

  /**
   * Method used by Angular to write the model value into the component.
   * @param obj The value to be written into the component.
   */
  writeValue(obj: any): void {
    // Get the list of waiters and find the waiter with the provided ID
    this.getWaiters().pipe(
      map((waitersArray: Waiter[]) => waitersArray.find(value => value.id === obj))
    ).subscribe((foundValue?: Waiter) => {
      this.itemSelected = foundValue;

      if (this.itemSelected != undefined) {
        // Get the image URL of the waiter
        this.imageService.getImageUrlByName(this.itemSelected!.picture).subscribe(
          url => {
            console.log("url" + url);
            this.itemSelectedUrl = url;
          },
          error => console.log(error)
        );
      }
    });
  }

  /**
   * Method used by Angular to register the change function in the component.
   * @param fn The function to be registered as the change function.
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * Method used by Angular to register the touch function in the component.
   * @param fn The function to be registered as the touch function.
   */
  registerOnTouched(fn: any): void {

  }

  /**
   * Method called when selecting a waiter in the interface.
   * @param waiterSelected The selected waiter object.
   * @param accordion The IonAccordionGroup element.
   */
  selectItem(waiterSelected: Waiter, accordion: IonAccordionGroup) {
    this.itemSelected = waiterSelected;
    accordion.value = '';
    this.propagateChange(this.itemSelected.id);

    // Get the image URL of the selected waiter
    this.imageService.getImageUrlByName(this.itemSelected!.picture).subscribe(
      url => {
        console.log("url" + url);
        this.itemSelectedUrl = url;
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    // Get the list of waiters from the waiters service filtered by the current restaurant ID
    this.waitersService.getWaiters().subscribe(waiters => {
      // Filter the waiters based on the current restaurant ID
      this.waiters = waiters.filter((w) => w.idRestaurant == this.userService.getUid());
    });
  }
  
  /**
   * Helper function to get the waiters.
   * @returns An Observable with the list of waiters.
   */
  getWaiters() {
    return this.waitersService.getWaiters();
  }




}
