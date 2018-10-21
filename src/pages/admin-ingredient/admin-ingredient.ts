import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { config } from '../../config/config';
import * as algoliasearch from 'algoliasearch';

/**
 * Generated class for the AdminIngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-ingredient',
  templateUrl: 'admin-ingredient.html',
})
export class AdminIngredientPage {
  name: string;
  type: string;
  price: number;

  client: any;
  index: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.client = algoliasearch(config.algolia.id, config.algolia.key);
    this.index = this.client.initIndex('ingredients');
  }

  addIngredient() {
    let loader = this.loadingCtrl.create({
      content: 'Adding ingredients...'
    });
    loader.present();

    this.db.collection('ingredients').add({
      name: this.name,
      type: this.type,
      price: Number(this.price)
    })
    .then(ref => {
      this.index.addObjects([{
        name: this.name,
        type: this.type,
        price: Number(this.price)
      }], (err, content) => {
        loader.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Ingredient added.',
          buttons: ['OK']
        });
        alert.present();

        this.name = null;
        this.type = null;
        this.price = null;
      });
    });
  }

}
