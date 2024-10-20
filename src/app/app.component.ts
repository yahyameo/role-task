import { Component } from '@angular/core';
import { AccessControlService } from './services/access-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "my-app";
  constructor(private accessControlService: AccessControlService) {
    // Set user roles
    this.accessControlService.setUserRoles(['user']);
  }
}
