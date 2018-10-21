import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  budget: number;
  time: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  prevPage() {
    this.navCtrl.pop({
      animation: 'wd-transition'
    });
  }

  nextPage() {
    this.navCtrl.push('RecipesPage', {}, {
      animation: 'wd-transition'
    });
  }

}
