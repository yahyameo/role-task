import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  private userRoles: string[] = [];

  // Set user roles
  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  // Check if the user has the required role
  hasRole(requiredRoles: string[]): boolean {
    return requiredRoles.every(role => this.userRoles.includes(role));
  }
}
