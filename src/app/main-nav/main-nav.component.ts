import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private toastService: ToastService, private router: Router) { }

  ngOnInit() {
  }
showAbout() {
this.toastService.showToast('success', 5000, 'This application was created James N. Clark (C) 2019');
}
logout() {
  localStorage.setItem('user', JSON.stringify({})); // set empty object, allowing contacts to persist
  this.router.navigate(['login']); // redirects to login
}

}
