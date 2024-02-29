import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth,} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moms';
  constructor(private router: Router, public fbAuth: AngularFireAuth) { }

  navigate(route: string) {
    this.router.navigate([route], { skipLocationChange: true });
  }

  successLoginCallback($event: any): void {
    console.log($event)
  }


  errorLoginCallback($event: any): void {
    console.log($event)
  }
}
