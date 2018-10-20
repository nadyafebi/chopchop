import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminIngredientPage } from './admin-ingredient';

@NgModule({
  declarations: [
    AdminIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminIngredientPage),
  ],
})
export class AdminIngredientPageModule {}
