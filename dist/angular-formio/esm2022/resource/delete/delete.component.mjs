import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "@angular/router";
class FormioResourceDeleteComponent {
    service;
    route;
    router;
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    onDelete() {
        this.service.remove().then(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
    onCancel() {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceDeleteComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceDeleteComponent, selector: "ng-component", ngImport: i0, template: "<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button>\r\n</div>\r\n" });
}
export { FormioResourceDeleteComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceDeleteComponent, decorators: [{
            type: Component,
            args: [{ template: "<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9kZWxldGUvZGVsZXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9kZWxldGUvZGVsZXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFJMUMsTUFHYSw2QkFBNkI7SUFFL0I7SUFDQTtJQUNBO0lBSFQsWUFDUyxPQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjO1FBRmQsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNwQixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO3VHQWZVLDZCQUE2QjsyRkFBN0IsNkJBQTZCLG9EQ1AxQyxxVEFLQTs7U0RFYSw2QkFBNkI7MkZBQTdCLDZCQUE2QjtrQkFIekMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2Uuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vZGVsZXRlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvUmVzb3VyY2VEZWxldGVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1pb1Jlc291cmNlU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIG9uRGVsZXRlKCkge1xyXG4gICAgdGhpcy5zZXJ2aWNlLnJlbW92ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLy4uLyddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQ2FuY2VsKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCAndmlldyddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxoMz5BcmUgeW91IHN1cmUgeW91IHdpc2ggdG8gZGVsZXRlIHRoaXMgcmVjb3JkPzwvaDM+XHJcbjxkaXYgY2xhc3M9XCJidG4tdG9vbGJhclwiPlxyXG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvbkRlbGV0ZSgpXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAxMHB4O1wiPlllczwvYnV0dG9uPlxyXG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvbkNhbmNlbCgpXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiPk5vPC9idXR0b24+XHJcbjwvZGl2PlxyXG4iXX0=