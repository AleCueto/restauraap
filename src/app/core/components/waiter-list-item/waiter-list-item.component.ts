import { Component, Input, OnInit } from '@angular/core';
import { Waiter } from '../../models/waiter.model';
import { WaitersService } from '../../services/waiters.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { WaitersDetailedComponent } from '../waiters-detailed/waiters-detailed.component';
import { lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-waiter-list-item',
  templateUrl: './waiter-list-item.component.html',
  styleUrls: ['./waiter-list-item.component.scss'],
})
export class WaiterListItemComponent implements OnInit {

  @Input() waiterInput: Waiter | undefined;

  imageUrl: string = ""

  constructor(
    private waiterService: WaitersService,
    private alert: AlertController,
    private modal: ModalController,
    public imageService: ImageService,
    private userService: UserService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    if (this.waiterInput) {
      console.log(this.waiterInput);
    }

    // Get the image URL of the waiter
    this.imageService.getImageUrlByName(this.waiterInput!.picture).subscribe(
      url => {
        console.log(url);
        this.imageUrl = url;
      },
      error => console.log(error)
    );
  }

  /**
   * Deletes a waiter from the list.
   * @param waiter The waiter to be deleted.
   */
  async deleteWaiter(waiter: Waiter) {
    await this.waiterService.deleteWaiter(waiter);
  }

  /**
   * Displays the delete alert when deleting a waiter.
   * @param waiter The waiter to be deleted.
   */
  async onDeleteAlert(waiter: Waiter) {
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('generic.warning2')),
      message: await lastValueFrom(this.translate.get('waiter.warning')),
      buttons: [
        {
          text: await lastValueFrom(this.translate.get('generic.cancel')),
          role: 'cancel',
          handler: () => {
            console.log("Operation canceled");
          },
        },
        {
          text: await lastValueFrom(this.translate.get('generic.delete')),
          role: 'confirm',
          handler: async () => {
            await this.deleteWaiter(waiter);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  /**
   * Presents the waiter form modal for adding or editing a waiter.
   * @param waiter The waiter object for editing, or null for adding a new waiter.
   */
  async presentWaiterForm(waiter: Waiter | null) {
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
            console.log(result.data.waiter)
            this.waiterService.addWaiter(result.data.waiter);
            break;
          case 'Edit':
            result.data.waiter.id = waiter?.id;
            this.waiterService.editWaiter(result.data.waiter);
            break;
          default:
            // Do nothing
        }
      }
    });
  }

/**
 * Opens the waiter form modal for editing a waiter.
 * @param waiter The waiter to be edited.
 */
onEditWaiter(waiter: Waiter) {
  this.presentWaiterForm(waiter);
}

/**
 * Toggles the busy status of the waiter.
 */
changeBussy() {
  const waiter = this.waiterInput;
  waiter!.isBusy = !waiter?.isBusy;
  this.waiterService.editWaiter(waiter!);
}


}
