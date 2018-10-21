import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { IngredientProvider } from '../../providers/ingredient/ingredient';

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
  budget: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private db: AngularFirestore, public loadingCtrl: LoadingController, private ingredientPvd: IngredientProvider) {
    ingredientPvd.getIngredients(null);
    let loader = loadingCtrl.create({
      content: 'Getting recipe...'
    });
    loader.present();

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
        this.budget = ingredientPvd.calculateBudget(this.ingredients);

        loader.dismiss();
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
