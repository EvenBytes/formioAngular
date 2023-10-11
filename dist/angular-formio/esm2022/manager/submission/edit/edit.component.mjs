import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "@formio/angular";
class SubmissionEditComponent {
    service;
    router;
    route;
    constructor(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
    }
    onSubmit(submission) {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionEditComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionEditComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  (submit)=\"onSubmit($event)\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i3.FormioComponent, selector: "formio" }] });
}
export { SubmissionEditComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  (submit)=\"onSubmit($event)\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL2VkaXQvZWRpdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL2VkaXQvZWRpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUkxQyxNQUdhLHVCQUF1QjtJQUV6QjtJQUNBO0lBQ0E7SUFIVCxZQUNTLE9BQTJCLEVBQzNCLE1BQWMsRUFDZCxLQUFxQjtRQUZyQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFDMUIsQ0FBQztJQUVMLFFBQVEsQ0FBQyxVQUFVO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzt1R0FUVSx1QkFBdUI7MkZBQXZCLHVCQUF1QixvRENQcEMsNlBBT0E7O1NEQWEsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBSG5DLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZm9ybS1tYW5hZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi9lZGl0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3VibWlzc2lvbkVkaXRDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1NYW5hZ2VyU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHsgfVxyXG5cclxuICBvblN1Ym1pdChzdWJtaXNzaW9uKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLy4uLyddLCB7cmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xyXG4gIH1cclxufVxyXG4iLCI8Zm9ybWlvXHJcbiAgW3JlbmRlcmVyXT1cInNlcnZpY2UuY29uZmlnLnJlbmRlcmVyXCJcclxuICBbc3JjXT1cInNlcnZpY2UuZm9ybWlvLnN1Ym1pc3Npb25VcmxcIlxyXG4gIChzdWJtaXQpPVwib25TdWJtaXQoJGV2ZW50KVwiXHJcbiAgKGZvcm1Mb2FkKT1cInNlcnZpY2Uuc2V0Rm9ybSgkZXZlbnQpXCJcclxuICAoc3VibWlzc2lvbkxvYWQpPVwic2VydmljZS5zdWJtaXNzaW9uTG9hZGVkKCRldmVudClcIlxyXG4+PC9mb3JtaW8+XHJcbiJdfQ==