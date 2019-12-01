import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private toastService: ToastService) {
  }
  user: IUser = {
    username: null,
    password: null
  };

  ngOnInit() {

  }
  login(user: IUser) {

    const presetUser = { username: 'jimmy', password: 'jc123' };

    if (user.username != null && user.password != null
      && user.username !== '' && user.password !== '') {
      if (user.username === presetUser.username && user.password === presetUser.password) {
        this.router.navigate(['contacts', user]); // log them in
        localStorage.setItem('user', JSON.stringify(user)); // saves to local storage
      } else {
        this.toastService.showToast('danger', 3000, 'Username or Password is not valid');
      }
    } else {
      this.toastService.showToast('danger', 3000, 'Must Specify Credentials');
    }
  }
}
