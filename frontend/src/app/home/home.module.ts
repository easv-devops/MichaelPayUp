import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {GroupModule} from '../group/group.module';
import {MyGroupsComponent} from "./my-groups/my-groups.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GroupModule
  ],
  declarations: [HomePage, MyGroupsComponent]
})
export class HomePageModule {
}
