import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from './../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  postData = {
    userName: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() { }

  validateInputs() {
    let username = this.postData.userName.trim();
    let password = this.postData.password.trim();
    let email = this.postData.email.trim();
    return (
      this.postData.userName &&
      this.postData.password &&
      this.postData.email &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0
    );
  }

  signupAction() {
    if (this.validateInputs()) {
      this.authService.signup(this.postData).subscribe(
        (res: any) => {
          console.log(res)
          if (res.data.user) {
            // Storing the User data.
            this.storageService
              .store(AuthConstants.AUTH, res.data.user)
              .then(res => {
                this.router.navigate(['home/feed']);
              });
          } else {
            this.toastService.presentToast(
              'Data alreay exists, please enter new details.'
            );
          }
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter email, username or password.'
      );
    }
  }
}