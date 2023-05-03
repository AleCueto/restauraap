import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { createTranslateLoader } from './utils/translate';
import { AboutComponent } from './components/about/about.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { DishesDetailedComponent } from './components/dishes-detailed/dishes-detailed.component';
import { DishListItemComponent } from './components/dish-list-item/dish-list-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { TableComponent } from './components/table/table.component';
import { TablesDetailedComponent } from './components/tables-detailed/tables-detailed.component';
import { TableListItemComponent } from './components/table-list-item/table-list-item.component';
import { WaitersComponent } from './components/waiters/waiters.component';
import { WaiterListItemComponent } from './components/waiter-list-item/waiter-list-item.component';
import { WaitersDetailedComponent } from './components/waiters-detailed/waiters-detailed.component';
import { WaiterSelectableComponent } from './components/waiter-selectable/waiter-selectable.component';


@NgModule({
  declarations: [DishesComponent, DishesDetailedComponent, DishListItemComponent, LoginComponent, RegisterComponent, MainComponent, TableComponent, TablesDetailedComponent, TableListItemComponent, WaitersComponent, WaiterListItemComponent, WaitersDetailedComponent, WaiterSelectableComponent, AboutComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
    loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient]
    }
    }),
    ReactiveFormsModule,
    
  ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    AboutComponent,
    DishesComponent,
    DishesDetailedComponent,
    DishListItemComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    TableComponent,
    TablesDetailedComponent,
    TableListItemComponent,
    WaitersComponent,
    WaiterListItemComponent,
    WaitersDetailedComponent,
    WaiterSelectableComponent
    ]
})
export class CoreModule { 

}
