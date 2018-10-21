import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { config } from '../../config/config';
import * as algoliasearch from 'algoliasearch';

/**
 * Generated class for the AdminAlgoliaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-algolia',
  templateUrl: 'admin-algolia.html',
})
export class AdminAlgoliaPage {
  client: any;
  index: any;
  dbRecipes: object[] = [];

  constructor(public navCtrl: NavController, public db: AngularFirestore, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    db.collection('recipes').snapshotChanges().map(actions => {
      return actions;
    }).subscribe(snapshots => {
      snapshots.forEach(doc => {
        let id = doc.payload.doc.id;
        let data = doc.payload.doc.data();
        this.dbRecipes.push({
          objectID: id,
          name: data.name,
          img: data.img,
          time: data.time,
          ingredients: data.ingredients
        });
      });
    });
    this.client = algoliasearch(config.algolia.id, config.algolia.key);
    this.index = this.client.initIndex('recipes');
  }

  sendToAlgolia() {
    console.log(this.dbRecipes);
    let loader = this.loadingCtrl.create({
      content: 'Adding recipes...'
    });
    loader.present();

    this.index.addObjects(this.dbRecipes, (err, content) => {
      loader.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Recipes added.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
