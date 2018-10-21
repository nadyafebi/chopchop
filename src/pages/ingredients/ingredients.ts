import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import 'rxjs/Rx';
import { config } from '../../config/config';
import * as algoliasearch from 'algoliasearch';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import { Searchbar } from 'ionic-angular';
import * as _ from 'lodash';

import { LabelDetector } from '../../gcloud/label_detection';
const label_detection = new LabelDetector();

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
  showelement: any;
  log: any;
  dbIngredients: object[] = [];

  constructor(public navCtrl: NavController, public db: AngularFirestore, private camera: Camera, private storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    db.collection('ingredients').valueChanges().map(actions => {
      return actions;
    }).subscribe(snapshots => {
      snapshots.forEach(doc => {
        this.dbIngredients.push(doc);
      });
    });
    this.client = algoliasearch(config.algolia.id, config.algolia.key);
    this.index = this.client.initIndex('ingredients');
  }

  inArray()
  {
    var count=this.ingredients.length;
    for(var i=0;i<count;i++)
    {
      if(this.ingredients[i]=== this.ingredient){return false;}
    }
    if(this.ingredient == undefined) {
      return false;}
      else
    return true;
  }
  create_list_element() {
    if(this.inArray())
    {
      this.ingredients.push(this.ingredient)
      this.ingredient=null;
      this.searchResults = [];
      this.showelement = false
    }

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
    this.ingredient = null;
    this.searchResults = [];
    this.storage.set('ingredients', this.ingredients);
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

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let loader = this.loadingCtrl.create({
       content: 'Processing picture...'
     });
     loader.present();
     label_detection.get(imageData).then(labels => {
       this.log = JSON.stringify(labels);
       let guesses = _.filter(labels, label => {
         return _.includes(_.map(this.dbIngredients, 'name'), label.description) && label.score > 0.5;
       });
       loader.dismiss();
       if (guesses.length > 0) {
         this.ingredients.push(guesses[0].description);
       } else {
         let alert = this.alertCtrl.create({
           title: "Can't Find Ingredient",
           subTitle: "There doesn't seem to be any ingredient in the picture.",
           buttons: ['OK']
         });
         alert.present();
       }
     });
    }, (err) => {
     // Handle error
    });
  }

  addSearch(result: any) {
    this.ingredients.push(result.name);
    this.ingredient = null;
    this.searchResults = [];

    console.log(this.dbIngredients);
  }
}
