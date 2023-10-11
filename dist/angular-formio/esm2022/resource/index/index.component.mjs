import { Component } from '@angular/core';
import { each } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "@angular/router";
import * as i3 from "../resource.config";
import * as i4 from "@formio/angular";
import * as i5 from "@formio/angular/grid";
class FormioResourceIndexComponent {
    service;
    route;
    router;
    config;
    cdr;
    ngZone;
    gridSrc;
    gridQuery;
    createText;
    constructor(service, route, router, config, cdr, ngZone) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.cdr = cdr;
        this.ngZone = ngZone;
    }
    ngOnInit() {
        this.service.init(this.route).then(() => {
            this.gridQuery = {};
            if (this.service &&
                this.config.parents &&
                this.config.parents.length) {
                this.service.loadParents().then((parents) => {
                    each(parents, (parent) => {
                        if (parent && parent.filter) {
                            this.gridQuery['data.' + parent.name + '._id'] =
                                parent.resource._id;
                        }
                    });
                    // Set the source to load the grid.
                    this.gridSrc = this.service.formUrl;
                    this.createText = `New ${this.service.form.title}`;
                    this.cdr.detectChanges();
                });
            }
            else if (this.service.formUrl) {
                this.gridSrc = this.service.formUrl;
                this.createText = `New ${this.service.form.title}`;
            }
        });
    }
    onSelect(row) {
        this.ngZone.run(() => {
            this.router.navigate([row._id, 'view'], { relativeTo: this.route });
        });
    }
    onCreateItem() {
        this.ngZone.run(() => {
            this.router.navigate(['new'], { relativeTo: this.route });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceIndexComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.FormioResourceConfig }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceIndexComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n", dependencies: [{ kind: "component", type: i4.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "component", type: i5.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
}
export { FormioResourceIndexComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.FormioResourceConfig }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vcmVzb3VyY2Uvc3JjL2luZGV4L2luZGV4LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9pbmRleC9pbmRleC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQyxNQUFNLGVBQWUsQ0FBQztBQUk3RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBRTlCLE1BR2EsNEJBQTRCO0lBTTlCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQVZGLE9BQU8sQ0FBVTtJQUNqQixTQUFTLENBQU07SUFDZixVQUFVLENBQVM7SUFFMUIsWUFDUyxPQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsTUFBNEIsRUFDNUIsR0FBc0IsRUFDdEIsTUFBYztRQUxkLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUM1QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRXZCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFDRSxJQUFJLENBQUMsT0FBTztnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDMUI7Z0JBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtvQkFDL0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFO3dCQUM1QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFOzRCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztnQ0FDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7eUJBQ3ZCO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUVILG1DQUFtQztvQkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNwRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQXJEVSw0QkFBNEI7MkZBQTVCLDRCQUE0QixvRENUekMsZ1ZBVUE7O1NERGEsNEJBQTRCOzJGQUE1Qiw0QkFBNEI7a0JBSHhDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29uZmlnIH0gZnJvbSAnLi4vcmVzb3VyY2UuY29uZmlnJztcclxuaW1wb3J0IHsgZWFjaCB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vaW5kZXguY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNvdXJjZUluZGV4Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgZ3JpZFNyYz86IHN0cmluZztcclxuICBwdWJsaWMgZ3JpZFF1ZXJ5OiBhbnk7XHJcbiAgcHVibGljIGNyZWF0ZVRleHQ6IFN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgc2VydmljZTogRm9ybWlvUmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBjb25maWc6IEZvcm1pb1Jlc291cmNlQ29uZmlnLFxyXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwdWJsaWMgbmdab25lOiBOZ1pvbmUsXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VydmljZS5pbml0KHRoaXMucm91dGUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmdyaWRRdWVyeSA9IHt9O1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlICYmXHJcbiAgICAgICAgdGhpcy5jb25maWcucGFyZW50cyAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlnLnBhcmVudHMubGVuZ3RoXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5sb2FkUGFyZW50cygpLnRoZW4oKHBhcmVudHM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZWFjaChwYXJlbnRzLCAocGFyZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ncmlkUXVlcnlbJ2RhdGEuJyArIHBhcmVudC5uYW1lICsgJy5faWQnXSA9XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVzb3VyY2UuX2lkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBTZXQgdGhlIHNvdXJjZSB0byBsb2FkIHRoZSBncmlkLlxyXG4gICAgICAgICAgdGhpcy5ncmlkU3JjID0gdGhpcy5zZXJ2aWNlLmZvcm1Vcmw7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVRleHQgPSBgTmV3ICR7dGhpcy5zZXJ2aWNlLmZvcm0udGl0bGV9YDtcclxuICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNlcnZpY2UuZm9ybVVybCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZFNyYyA9IHRoaXMuc2VydmljZS5mb3JtVXJsO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dCA9IGBOZXcgJHt0aGlzLnNlcnZpY2UuZm9ybS50aXRsZX1gO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0KHJvdzogYW55KSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm93Ll9pZCwgJ3ZpZXcnXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkNyZWF0ZUl0ZW0oKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ25ldyddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPGZvcm1pby1hbGVydHMgW2FsZXJ0c109XCJzZXJ2aWNlLmFsZXJ0c1wiPjwvZm9ybWlvLWFsZXJ0cz5cclxuPGZvcm1pby1ncmlkXHJcbiAgW3NyY109XCJncmlkU3JjXCJcclxuICBbcXVlcnldPVwiZ3JpZFF1ZXJ5XCJcclxuICBbb25Gb3JtXT1cInNlcnZpY2UuZm9ybUxvYWRlZFwiXHJcbiAgKHJvd1NlbGVjdCk9XCJvblNlbGVjdCgkZXZlbnQpXCJcclxuICAoZXJyb3IpPVwic2VydmljZS5vbkVycm9yKCRldmVudClcIlxyXG4gIChjcmVhdGVJdGVtKT1cIm9uQ3JlYXRlSXRlbSgpXCJcclxuICBbY3JlYXRlVGV4dF09XCJjcmVhdGVUZXh0XCJcclxuPjwvZm9ybWlvLWdyaWQ+XHJcbiJdfQ==