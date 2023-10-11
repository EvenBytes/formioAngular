import { Component, EventEmitter } from '@angular/core';
import { Formio } from '@formio/js';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "@angular/router";
import * as i3 from "../resource.config";
import * as i4 from "@formio/angular";
class FormioResourceEditComponent {
    service;
    route;
    router;
    config;
    triggerError = new EventEmitter();
    onSubmitDone = new EventEmitter();
    submission = { data: {} };
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
    }
    onSubmit(submission) {
        const edit = this.service.resource;
        edit.data = submission.data;
        this.service.save(edit)
            .then(() => {
            this.onSubmitDone.emit(this.service.resource);
            this.router.navigate(['../', 'view'], { relativeTo: this.route });
        })
            .catch((err) => this.triggerError.emit(err));
    }
    ngOnDestroy() {
        Formio.clearCache();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceEditComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceEditComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  [submitDone]=\"onSubmitDone\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i4.FormioComponent, selector: "formio" }] });
}
export { FormioResourceEditComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  [submitDone]=\"onSubmitDone\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.FormioResourceConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9yZXNvdXJjZS9zcmMvZWRpdC9lZGl0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9lZGl0L2VkaXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQVksTUFBTSxlQUFlLENBQUM7QUFJakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7O0FBRXBDLE1BR2EsMkJBQTJCO0lBSzdCO0lBQ0E7SUFDQTtJQUNBO0lBUEYsWUFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3JELFlBQVksR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN4RCxVQUFVLEdBQUcsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7SUFDL0IsWUFDUyxPQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsTUFBNEI7UUFINUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQXNCO0lBQ2xDLENBQUM7SUFFSixRQUFRLENBQUMsVUFBZTtRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3BCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO3VHQXhCVSwyQkFBMkI7MkZBQTNCLDJCQUEyQixvRENUeEMsbU1BT0E7O1NERWEsMkJBQTJCOzJGQUEzQiwyQkFBMkI7a0JBSHZDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29uZmlnIH0gZnJvbSAnLi4vcmVzb3VyY2UuY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvIH0gZnJvbSAnQGZvcm1pby9qcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vZWRpdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb1Jlc291cmNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIHRyaWdnZXJFcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHVibGljIG9uU3VibWl0RG9uZTogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHVibGljIHN1Ym1pc3Npb24gPSB7ZGF0YToge319O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1pb1Jlc291cmNlU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgY29uZmlnOiBGb3JtaW9SZXNvdXJjZUNvbmZpZ1xyXG4gICkge31cclxuXHJcbiAgb25TdWJtaXQoc3VibWlzc2lvbjogYW55KSB7XHJcbiAgICBjb25zdCBlZGl0ID0gdGhpcy5zZXJ2aWNlLnJlc291cmNlO1xyXG4gICAgZWRpdC5kYXRhID0gc3VibWlzc2lvbi5kYXRhO1xyXG4gICAgdGhpcy5zZXJ2aWNlLnNhdmUoZWRpdClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25TdWJtaXREb25lLmVtaXQodGhpcy5zZXJ2aWNlLnJlc291cmNlKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLycsICd2aWV3J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHRoaXMudHJpZ2dlckVycm9yLmVtaXQoZXJyKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIEZvcm1pby5jbGVhckNhY2hlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtaW9cclxuICBbZm9ybV09XCJzZXJ2aWNlLmZvcm1cIlxyXG4gIFtzdWJtaXNzaW9uXT1cInNlcnZpY2UucmVzb3VyY2VcIlxyXG4gIFtlcnJvcl09XCJ0cmlnZ2VyRXJyb3JcIlxyXG4gIFtzdWJtaXREb25lXT1cIm9uU3VibWl0RG9uZVwiXHJcbiAgKHN1Ym1pdCk9XCJvblN1Ym1pdCgkZXZlbnQpXCJcclxuPjwvZm9ybWlvPlxyXG4iXX0=