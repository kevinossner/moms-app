import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moms';
  constructor(private router: Router) { }

  navigate(route: string) {
    this.router.navigate([route], { skipLocationChange: true });
  }
}
