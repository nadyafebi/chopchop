import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  name: string;
  img: string;
  time: number;
  ingredients: object[];
  steps: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private db: AngularFirestore) {
    storage.get('recipe')
    .then(recipe => {
      db.collection('recipes').doc(recipe).ref.get()
      .then(doc => {
        let data = doc.data();
        this.name = data.name;
        this.img = data.img;
        this.time = data.time;
        this.ingredients = data.ingredients;
        this.steps = data.steps;
      });
    });
  }

  ngOnInit() {
    this.storage.get('recipe')
    .then(recipe => {
      console.log(recipe);
    });
  }

}
