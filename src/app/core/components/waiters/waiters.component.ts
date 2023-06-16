import { Component, OnInit } from '@angular/core';
import { Waiter } from '../../models/waiter.model';
import { AlertController, ModalController } from '@ionic/angular';
import { WaitersService } from '../../services/waiters.service';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { WaitersDetailedComponent } from '../waiters-detailed/waiters-detailed.component';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.scss'],
})
export class WaitersComponent implements OnInit {
  waiters: Waiter[] | undefined; // Array of waiters

  constructor(
    private modal: ModalController,
    private alert: AlertController,
    private waitersService: WaitersService,
    private imageService: ImageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Fetch waiters from the service
    this.waitersService.getWaiters().subscribe(waiters => {
      this.waiters = waiters;
      // Filter waiters based on ownership
      this.waiters = this.waiters?.filter(waiter => this.checkWaiterBelong(waiter));
    });
  }

  /**
   * Presents the waiter form modal for adding or editing a waiter.
   * @param waiter The waiter object to be edited, or null for a new waiter.
   */
  async presentWaiterForm(waiter: Waiter | null) {
    // Create and present the waiter form modal
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
            // Add new waiter
            this.waitersService.addWaiter(result.data.waiter);
            break;
          case 'Edit':
            // Update existing waiter
            result.data.waiter.id = waiter?.id;
            this.waitersService.editWaiter(result.data.waiter);
            break;
          default:
            // Do nothing
        }
      }
    });
  }

  /**
   * Handler for creating a new waiter.
   */
  onNewWaiter() {
    // Present the waiter form with null waiter (creating a new waiter)
    this.presentWaiterForm(null);
  }

  /**
   * Checks if the waiter belongs to the current user's restaurant.
   * @param waiter The waiter to be checked.
   * @returns True if the waiter belongs to the current user's restaurant, false otherwise.
   */
  checkWaiterBelong(waiter: Waiter) {
    if (waiter.idRestaurant == this.userService.getUid()) {
      // Waiter belongs to the current user's restaurant
      return true;
    } else {
      // Waiter does not belong to the current user's restaurant
      return false;
    }
  }
}
