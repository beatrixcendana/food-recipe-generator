import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { OpenaiService } from '../openai.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public ingredient_names: string = '';
  public ingredients_arr: any[] = [];

  public recipes: any[] = [];

  public color: string = '';

  private handlerMessage: string = '';

  constructor(private alertCtrl: AlertController,
    private recipeService: OpenaiService,
    private loadingCtrl: LoadingController
    ) {}

  async onCommitSubmit() {
    let ingredientItems = this.ingredient_names.split(',');
    this.ingredient_names = "";
    
    for (let i=0; i< ingredientItems.length; i++) {

      if (i%2 == 0) {
        this.color = 'tertiary';
      }

      if (i%2 != 0) {
        this.color = 'danger';
      }

      this.ingredients_arr.push({
        "ingredient_name": ingredientItems[i],
        "color": this.color
      })

    }

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });

    loading.present();

    this.recipeService.generateRecipes(ingredientItems).subscribe((response: any) => {
      console.log(response);

      loading.dismiss();

      this.recipes = response;

    },
    (error) => {
      loading.dismiss();
      console.log(error)
    }
    )
  }

  async onCommitClear() {
    const alert = await this.alertCtrl.create({
      header: 'Info!',
      message: 'Are you sure want to clear?',
      buttons: [
        {
          text: 'Yes, Proceed',
          role: 'confirm',
          handler: () => {
            this.ingredients_arr.length = 0;
            this.recipes.length = 0;
            this.ingredient_names = "";
            this.handlerMessage = 'Ingredients succesfully cleared!'
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }

}
