import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  name: string;
  time: string;
  ingredients: object[] = [];
  ingredientName: string;
  ingredientHowMany: string;
  steps: string[] = [];
  step: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  addIngredient() {
    this.ingredients.push({
      name: this.ingredientName,
      howMany: this.ingredientHowMany
    });
    this.ingredientName = '';
    this.ingredientHowMany = '';
  }

  addStep() {
    this.steps.push(this.step);
    this.step = '';
  }

  addRecipe() {
    let loader = this.loadingCtrl.create({
      content: 'Adding recipe...'
    });
    loader.present();

    this.db.collection('recipes').add({
      name: this.name,
      time: this.time,
      ingredients: this.ingredients,
      steps: this.steps
    })
    .then(ref => {
      loader.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Recipe added.',
        buttons: ['OK']
      });
      alert.present();

      this.name = '';
      this.time = null;
      this.ingredients = [];
      this.steps = [];
    });
  }

}