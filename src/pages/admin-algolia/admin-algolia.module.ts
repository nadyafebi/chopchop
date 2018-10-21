import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAlgoliaPage } from './admin-algolia';

@NgModule({
  declarations: [
    AdminAlgoliaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAlgoliaPage),
  ],
})
export class AdminAlgoliaPageModule {}
