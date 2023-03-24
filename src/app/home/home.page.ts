import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public ingredient_names: string = '';
  public ingredients_arr: any = [];

  private handlerMessage: string = '';

  constructor(private alertCtrl: AlertController) {}

  async onCommitSubmit() {
    this.ingredients_arr = this.ingredient_names.split(',');
    console.log(this.ingredients_arr)
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
