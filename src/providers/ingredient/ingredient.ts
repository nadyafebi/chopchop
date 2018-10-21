import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';

/*
  Generated class for the IngredientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngredientProvider {
  ingredients: any[] = [];

  constructor(public http: HttpClient, private db: AngularFirestore) {
  }

  getIngredients(arr: any[]) {
    if (this.ingredients.length === 0) {
      this.db.collection('ingredients').valueChanges().map(actions => {
        return actions;
      }).subscribe(snapshots => {
        snapshots.forEach(doc => {
          this.ingredients.push(doc);
          if (arr) {
            arr.push(doc);
          }
        });
      });
    } else {
      if (arr) {
        arr = this.ingredients;
      }
    }
  }

  calculateBudget(arr: any[]): number {
    let budget: number = 0;
    arr.forEach(ingredient => {
      let search = _.filter(this.ingredients, dbIngredient => {
        return dbIngredient.name === ingredient.name;
      });
      if (search.length > 0) {
        budget += search[0].price;
      }
    });
    return budget;
  }

}
