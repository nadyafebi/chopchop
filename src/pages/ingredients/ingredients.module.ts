import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngredientsPage } from './ingredients';

@NgModule({
  declarations: [
    IngredientsPage,
  ],
  imports: [
    IonicPageModule.forChild(IngredientsPage),
  ],
})
export class IngredientsPageModule {}
