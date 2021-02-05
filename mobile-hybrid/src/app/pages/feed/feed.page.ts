import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PhotoService } from '../../services/photo.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})

export class FeedPage implements OnInit {
  public authUser: any;
  constructor(private auth: AuthService, public photoService: PhotoService, private localNotifications: LocalNotifications) { }

  async ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.localNotifications.schedule({
      id: 1,
      text: 'Nouvelle photo dans la gallerie',
      data: { secret: 'secret' }
    });
  }
}
