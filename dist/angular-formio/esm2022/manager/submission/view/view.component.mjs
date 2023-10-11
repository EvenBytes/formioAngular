import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../form-manager.service";
import * as i2 from "@formio/angular";
class SubmissionViewComponent {
    service;
    constructor(service) {
        this.service = service;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionViewComponent, deps: [{ token: i1.FormManagerService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionViewComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  [readOnly]=\"true\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
}
export { SubmissionViewComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  [readOnly]=\"true\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL3ZpZXcvdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL3ZpZXcvdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRzFDLE1BR2EsdUJBQXVCO0lBQ2Y7SUFBbkIsWUFBbUIsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBSSxDQUFDO3VHQUR4Qyx1QkFBdUI7MkZBQXZCLHVCQUF1QixvRENOcEMsbVBBT0E7O1NERGEsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBSG5DLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZm9ybS1tYW5hZ2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXcuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdWJtaXNzaW9uVmlld0NvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHNlcnZpY2U6IEZvcm1NYW5hZ2VyU2VydmljZSkgeyB9XHJcbn1cclxuIiwiPGZvcm1pb1xyXG4gIFtyZW5kZXJlcl09XCJzZXJ2aWNlLmNvbmZpZy5yZW5kZXJlclwiXHJcbiAgW3NyY109XCJzZXJ2aWNlLmZvcm1pby5zdWJtaXNzaW9uVXJsXCJcclxuICBbcmVhZE9ubHldPVwidHJ1ZVwiXHJcbiAgKGZvcm1Mb2FkKT1cInNlcnZpY2Uuc2V0Rm9ybSgkZXZlbnQpXCJcclxuICAoc3VibWlzc2lvbkxvYWQpPVwic2VydmljZS5zdWJtaXNzaW9uTG9hZGVkKCRldmVudClcIlxyXG4+PC9mb3JtaW8+XHJcbiJdfQ==