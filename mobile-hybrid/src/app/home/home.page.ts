import { Component, OnInit } from '@angular/core';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Photo, PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public authUser: any;
  constructor(private auth: AuthService, public photoService: PhotoService, 
    private router: Router, private storageService: StorageService,
    public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          }
      }]
    });
    await actionSheet.present();
  }

  logout() {
    this.auth.logout();
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
