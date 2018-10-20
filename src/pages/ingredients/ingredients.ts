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
 amount: number = 12;
  noMeat: number = 0;
  noVegg: number = 0;
  ingredients: string[] = [];
  ingredient: string;

  constructor(public navCtrl: NavController) { }


  search() {
    this.navCtrl.push('SearchPage', {
      amount: this.amount,
      noMeat: this.noMeat,
      noVegg: this.noVegg
    });
  }
inArray()
{
    var count=this.ingredients.length;
    for(var i=0;i<count;i++)
    {
        if(this.ingredients[i]=== this.ingredient){return false;}
    }
    return true;
}
create_list_element() {
  if(this.inArray())
this.ingredients.push(this.ingredient);

  
  }

remove(array: array, element: object) {
    const index = array.indexOf(element);

    if (index !== -1) {
        return array.splice(index, 1);
    }
}

  delete(ingredient: string){
  this.ingredients = remove(this.ingredients, ingredient);
  console.log(this.ingredients);
  }

 customLabelFunc(e){
      e.preventDefault();
      alert('label clicked');
    }
}
