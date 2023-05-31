import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../services/table.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { TablesDetailedComponent } from '../tables-detailed/tables-detailed.component';
import { Waiter } from '../../models/waiter.model';
import { WaitersService } from '../../services/waiters.service';

@Component({
  selector: 'app-table-list-item',
  templateUrl: './table-list-item.component.html',
  styleUrls: ['./table-list-item.component.scss'],
})
export class TableListItemComponent implements OnInit {

  @Input() tableInput: Table | undefined;

  waiters!: Waiter[]

  waiter: any = {};

  waiterImageUrl: string = ""

  constructor(
    private tablesService: TableService,
    private alert: AlertController,
    private modal: ModalController,
    public imageService: ImageService,
    private userService: UserService,
    private waiterService: WaitersService
  ) {

    // this.waiter = firestore

  }

  ngOnInit() {

    //Get all the waiters to automatic assignment
    this.waiterService.getWaiters().subscribe(waiters => {
      this.waiters = waiters.filter((w) => w.idRestaurant == this.userService.getUid());
    })

    // this.waiter = this.waiterService.getWaiterById(this.tableInput!.idWaiter)

    if (this.tableInput?.idWaiter != "") {

      this.waiterService.getWaiterById(this.tableInput!.idWaiter).subscribe(
        waiter => {
          this.waiter = waiter;
          console.log(this.waiter)

          this.imageService.getImageUrlByName(this.waiter.picture).subscribe(
            url => {
              console.log(url);
              this.waiterImageUrl = url;
            },
            error => console.log(error)
          );

        },
        error => console.log(error)
      );

    }
    // this.imageService.getImageUrlByName(this.waiter.image).subscribe(
    //   url => {
    //     console.log(url);
    //     this.waiterImageUrl = url;
    //   },
    //   error => console.log(error)
    // );

    // console.log(this.waiter)


  }


  async deleteTable(table: Table) {
    console.log("rfwe");
    await this.tablesService.deleteTable(table);
  }


  async onDeleteAlert(table: Table) {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar este plato?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: async () => {
            await this.deleteTable(table)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presenttableForm(table: Table | null) {
    const modal = await this.modal.create({
      component: TablesDetailedComponent,
      componentProps: {
        table: table
      },
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            console.log(result.data.table)
            this.tablesService.addTable(result.data.table);
            break;
          case 'Edit':
            result.data.table.id = table?.id;
            this.tablesService.editTable(result.data.table);
            break;
          default:
        }
      }
    });
  }

  cleanWaiter() {
    //Reduce tables
    this.waiter.tablesAttended--;
    this.waiter.id = this.tableInput?.idWaiter

    console.log("rew:" + this.waiter.id)

    if (this.waiter.tablesAttended <= 0) {
      console.log(this.waiter.tablesAttended)
      this.waiter.isBusy = false;
    }

    this.waiterService.editWaiter(this.waiter)

    this.waiter = null

    const table = this.tableInput
    table!.idWaiter = ""
    this.tablesService.editTable(table!)
  }

  onEdittable(table: Table) {
    this.presenttableForm(table);
  }

  autoAssingWaiters() {
    let waitersRandom = this.waiters;

    waitersRandom.sort(() => Math.random() - 0.5)

    waitersRandom =  waitersRandom.filter((item) => item.enabled == true)

    console.log("REWERFWREFW: " + waitersRandom)

    let waiterNotBussy = waitersRandom.find((w) => w.isBusy == false)
    if (waiterNotBussy) {
      //Set waiter bussy

      waiterNotBussy.tablesAttended++;
      waiterNotBussy.isBusy = true
      
      console.log("waiter not bussy tables: " + waiterNotBussy.tablesAttended )
      this.waiterService.editWaiter(waiterNotBussy)
      console.log("waiter not bussy id: " + waiterNotBussy.id )

      //Set tables's waiter as waiternotbussy
      const table = this.tableInput
      table!.idWaiter = waiterNotBussy.id
      this.tablesService.editTable(table!)
    }

    let waiterLessBussy:any

    if(waitersRandom.length > 0){
      waiterLessBussy = waitersRandom.reduce((lessBussy, waiter) => {
        if (waiter.tablesAttended < lessBussy.tablesAttended) {
          return waiter;
        } else {
          return lessBussy;
        }
      });
    }
      

    if (!waiterNotBussy && waiterLessBussy) {

      //Set waiter bussy
      waiterLessBussy.tablesAttended++;
      waiterLessBussy.isBusy = true
      this.waiterService.editWaiter(waiterLessBussy)

      //Set tables's waiter as waiternotbussy
      const table = this.tableInput
      table!.idWaiter = waiterLessBussy.id
      this.tablesService.editTable(table!)

    }

    if (!waiterNotBussy && !waiterLessBussy) {
      console.log("NO HAY CAMAREROS DISPONIBLES")
      this.onNoWaitersAlert()
    }

  }

  
  async onNoWaitersAlert() {
    const alert = await this.alert.create({
      header: 'Atención',
      message: 'No dispone de camareros activos.',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        }
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


}
