import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "@formio/angular";
class SubmissionDeleteComponent {
    service;
    router;
    route;
    alerts;
    constructor(service, router, route, alerts) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.alerts = alerts;
    }
    onDelete() {
        this.service.formio.deleteSubmission().then(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
        }).catch(err => this.alerts.setAlert({ type: 'danger', message: (err.message || err) }));
    }
    onCancel() {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionDeleteComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormioAlerts }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionDeleteComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n", dependencies: [{ kind: "component", type: i3.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }] });
}
export { SubmissionDeleteComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionDeleteComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormioAlerts }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL21hbmFnZXIvc3JjL3N1Ym1pc3Npb24vZGVsZXRlL2RlbGV0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL2RlbGV0ZS9kZWxldGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFLMUMsTUFHYSx5QkFBeUI7SUFFM0I7SUFDQTtJQUNBO0lBQ0E7SUFKVCxZQUNTLE9BQTJCLEVBQzNCLE1BQWMsRUFDZCxLQUFxQixFQUNyQixNQUFvQjtRQUhwQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBYztJQUMxQixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQzt1R0FoQlUseUJBQXlCOzJGQUF6Qix5QkFBeUIsb0RDUnRDLDZXQU1BOztTREVhLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQUhyQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2Zvcm0tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb0FsZXJ0cyB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vZGVsZXRlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3VibWlzc2lvbkRlbGV0ZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgc2VydmljZTogRm9ybU1hbmFnZXJTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHB1YmxpYyBhbGVydHM6IEZvcm1pb0FsZXJ0c1xyXG4gICkge31cclxuXHJcbiAgb25EZWxldGUoKSB7XHJcbiAgICB0aGlzLnNlcnZpY2UuZm9ybWlvLmRlbGV0ZVN1Ym1pc3Npb24oKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8uLi8nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xyXG4gICAgfSkuY2F0Y2goZXJyID0+IHRoaXMuYWxlcnRzLnNldEFsZXJ0KHt0eXBlOiAnZGFuZ2VyJywgbWVzc2FnZTogKGVyci5tZXNzYWdlIHx8IGVycil9KSk7XHJcbiAgfVxyXG5cclxuICBvbkNhbmNlbCgpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgJ3ZpZXcnXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8Zm9ybWlvLWFsZXJ0cyBbYWxlcnRzXT1cImFsZXJ0c1wiPjwvZm9ybWlvLWFsZXJ0cz5cclxuPGgzPkFyZSB5b3Ugc3VyZSB5b3Ugd2lzaCB0byBkZWxldGUgdGhpcyByZWNvcmQ/PC9oMz5cclxuPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XHJcbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9uRGVsZXRlKClcIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDEwcHg7XCI+WWVzPC9idXR0b24+XHJcbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPk5vPC9idXR0b24+XHJcbjwvZGl2PlxyXG4iXX0=