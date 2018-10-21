import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { config } from '../../config/config';
import * as algoliasearch from 'algoliasearch';
import * as _ from 'lodash';
import { IngredientProvider } from '../../providers/ingredient/ingredient';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit {
  client: any;
  index: any;
  searchResults: object[] = [];

  ingredients: string[];
  budget: number;
  time: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController, private ingredientPvd: IngredientProvider) {
    ingredientPvd.getIngredients();
    this.client = algoliasearch(config.algolia.id, config.algolia.key);
    this.index = this.client.initIndex('recipes');
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: 'Looking for recipes...'
    });
    loader.present();

    this.storage.get('ingredients')
    .then(ingredients => {
      this.ingredients = ingredients;
      return this.storage.get('budget');
    })
    .then(budget => {
      this.budget = budget;
      return this.storage.get('time');
    })
    .then (time => {
      this.time = time;

      let search: any = {};
      if (this.ingredients.length > 0) {
        search.query = this.ingredients.join(' ');
      }
      if (this.time > 0) {
        search.filters = 'time <= ' + this.time;
      }

      this.index.search(search, (err, result) => {
        this.searchResults = _.uniqBy(result.hits, 'name');
        if (this.budget > 0) {
          this.searchResults.forEach(recipe => {
            recipe.budget = this.ingredientPvd.calculateBudget(recipe.ingredients);
            console.log(recipe);
          });
          this.searchResults = this.searchResults.filter(recipe => {
            return recipe.budget <= this.budget;
          });
        }
        loader.dismiss();
      });
    });
  }

  listIngredients(list: object[]) {
    return _.map(list, 'name').join(', ');
  };

  prevPage() {
    this.navCtrl.pop({
      animation: 'wd-transition'
    });
  }

  goToRecipe(id: string) {
    this.storage.set('recipe', id);
    this.navCtrl.push('RecipePage');
  }

}
