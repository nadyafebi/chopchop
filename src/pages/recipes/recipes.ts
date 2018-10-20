import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = algoliasearch(config.algolia.id, config.algolia.key);
    this.index = this.client.initIndex('recipes');
  }

  ngOnInit() {
    this.index.search({}, (err, result) => {
      this.searchResults = result.hits;
    });
  }

  prevPage() {
    this.navCtrl.pop({
      animation: 'wd-transition'
    });
  }

}
