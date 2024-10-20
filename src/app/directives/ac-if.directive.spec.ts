import { AcIfDirective } from './ac-if.directive';
import { ViewContainerRef, TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AccessControlService } from '../services/access-control.service';
import { Component, Input } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';


@Component({
  template: `
    <button *acIf="['user']">User Button</button>
    <button *acIf="['admin']">Admin Button</button>
    <input *acIf="'user'; else unauthorized" placeholder="Only for user role">
    <ng-template #unauthorized><p>You are not authorized!</p></ng-template>
  `
})
class TestHostComponent {
  @Input() userRole!: string[];
}

describe('AcIfDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>; // Explicitly define the type
  let accessControlService: jasmine.SpyObj<AccessControlService>; // Use jasmine.SpyObj

  beforeEach(() => {
    const accessControlServiceSpy = jasmine.createSpyObj('AccessControlService', ['hasRole']);

    TestBed.configureTestingModule({
      declarations: [TestHostComponent, AcIfDirective],
      providers: [
        { provide: AccessControlService, useValue: accessControlServiceSpy }
      ]
    });

    accessControlService = TestBed.inject(AccessControlService) as jasmine.SpyObj<AccessControlService>;
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should display elements for a valid role', () => {
    // Mock the roles for the user
    accessControlService.hasRole.and.returnValue(true);
    fixture.detectChanges();

    const buttonUser = fixture.nativeElement.querySelector('button');
    const inputUser = fixture.nativeElement.querySelector('input');
    expect(buttonUser).toBeTruthy(); // Ensure button for 'user' role is rendered
    expect(inputUser).toBeTruthy();  // Ensure input for 'user' role is rendered
  });

  it('should not display elements for an invalid role', () => {
    // Mock the roles for the user
    accessControlService.hasRole.and.returnValue(false);
    fixture.detectChanges();

    const buttonAdmin = fixture.nativeElement.querySelector('button');
    expect(buttonAdmin).toBeFalsy(); // Ensure button for 'admin' role is not rendered
  });

  it('should render else block when user does not have access', () => {
    accessControlService.hasRole.and.returnValue(false);
    fixture.detectChanges();

    const unauthorizedMessage = fixture.nativeElement.querySelector('p');
    expect(unauthorizedMessage).toBeTruthy(); // Ensure the else block renders the unauthorized message
    expect(unauthorizedMessage.textContent).toContain('You are not authorized!');
  });
});
