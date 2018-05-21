import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  data: any;
  name: string;
  address: string;
  latitude: number;
  longitude: number;

  constructor(public navCtrl: NavController,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController
    ) {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    this.doGetUser();
  }

  doGetUser() {
    this.showLoader();
    this.authService.getuser()
    .subscribe( result => {
      this.loading.dismiss();
      if (result.json()){
        this.data = result.json();
     } else {
        this.presentToast("Invalid credentials. Try with another username or password.");
     }      
      console.log('Name: ',this.data.name);
      this.name = this.data.name;
      this.address = this.data.address;
      this.latitude = this.data.latitude;
      this.longitude = this.data.longitude;
    }, err => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }  
}
