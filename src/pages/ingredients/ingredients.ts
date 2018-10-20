import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**
 * Generated class for the IngredientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingredients',
  templateUrl: 'ingredients.html',
})
export class IngredientsPage {
  allIngredients: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore) {
    this.allIngredients = db.collection('ingredients').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientsPage');
  }

}
