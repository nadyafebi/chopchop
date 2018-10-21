import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { config } from '../../config/config';
import * as algoliasearch from 'algoliasearch';

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
  searchResults: object[];

  ingredients: string[];
  budget: number;
  time: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.client = algoliasearch(config.algolia.id, config.algolia.key);
    this.index = this.client.initIndex('recipes');
  }

  ngOnInit() {
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
      console.log(this.ingredients.join(' '));
      this.index.search({
        query: this.ingredients.join(' ')
      }, (err, result) => {
        this.searchResults = result.hits;
      })
    });
  }

  prevPage() {
    this.navCtrl.pop({
      animation: 'wd-transition'
    });
  }

}
