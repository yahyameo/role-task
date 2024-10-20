import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccessControlService } from '../services/access-control.service';

@Directive({
  selector: '[acIf]'
})
export class AcIfDirective {
  private hasView = false;
  private roles: string[] = [];

  constructor(
    private accessControlService: AccessControlService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set acIf(roles: string | string[]) {
    // Ensure roles is an array, even if a single string is provided
    this.roles = Array.isArray(roles) ? roles : [roles];

    const hasRole = this.accessControlService.hasRole(this.roles);

    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  @Input() set acIfElse(elseTemplate: TemplateRef<any>) {
    const hasRole = this.accessControlService.hasRole(this.roles);

    if (!hasRole) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(elseTemplate);
    }
  }
}
