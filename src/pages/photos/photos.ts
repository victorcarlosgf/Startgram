import { Component } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { ShowMapPage } from '../show-map/show-map'

@Component({
    selector: 'page-photos',
    templateUrl: 'photos.html'
})

export class PhotosPage {
    public photos: any[] = [];

    constructor(
        db: AngularFireDatabase,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController){
            let loader = this.loadingCtrl.create({
                content: "Carregando fotos..."});
            loader.present();
        
            db.list('/photos').valueChanges().subscribe(
                photos => {
                    this.photos = photos.reverse();
                    loader.dismiss();
                });
    }

    showMap(location){
        let modal = this.modalCtrl.create(ShowMapPage, { location: location });
        modal.present();
    }
}