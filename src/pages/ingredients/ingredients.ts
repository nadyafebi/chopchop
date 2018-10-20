import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { config } from '../../config/config';
import * as algoliasearch from 'algoliasearch';

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
  ingredients: string[] = [];
  ingredient: string;
  client: any;
  index: any;
  searchResults: object[];

  constructor(public navCtrl: NavController, public db: AngularFirestore) {
    this.client = algoliasearch(config.algolia.id, config.algolia.key);
    this.index = this.client.initIndex('ingredients');
  }

  inArray()
  {
    var count=this.ingredients.length;
    for(var i=0;i<count;i++)
    {
      if("this.ingredients[i]=== this.ingredient"){return false;}
    }
    if(this.ingredient == undefined) {
      return false;}
      else
    return true;
  }
  create_list_element() {
    if(this.inArray())
    {console.log(this.ingredient)
    this.ingredients.push(this.ingredient);}


  }

  remove(array: any[], element: object) {
    const index = array.indexOf(element);

    if (index !== -1) {
      return array.splice(index, 1);
    }
  }

  delete(ingredient: string){
    // this.ingredients = remove(this.ingredients, ingredient);
    // console.log(this.ingredients);
  }

  customLabelFunc(e){
    e.preventDefault();
    alert('label clicked');
  }

  nextPage() {
    this.navCtrl.push('SettingsPage', {}, {
      animation: 'wd-transition'
    });
  }

  searchIngredient() {
    if (this.ingredient) {
      this.index.search({
        query: this.ingredient,
        hitsPerPage: 3
      }, (err, result) => {
        this.searchResults = result.hits;
      });
    } else {
      this.searchResults = [];
    }
  }
}
