import { Component, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "@angular/router";
import * as i3 from "../resource.config";
import * as i4 from "@angular/common";
import * as i5 from "@formio/angular";
class FormioResourceCreateComponent {
    service;
    route;
    router;
    config;
    onError;
    onSuccess;
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.onError = new EventEmitter();
        this.onSuccess = new EventEmitter();
    }
    ngOnInit() {
        this.service.init(this.route);
    }
    onSubmit(submission) {
        this.service
            .save(submission)
            .then(() => {
            this.router.navigate(['../', this.service.resource._id, 'view'], {
                relativeTo: this.route
            });
        })
            .catch((err) => this.onError.emit(err));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceCreateComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceCreateComponent, selector: "ng-component", ngImport: i0, template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left bi bi-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.FormioComponent, selector: "formio" }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
}
export { FormioResourceCreateComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceCreateComponent, decorators: [{
            type: Component,
            args: [{ template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left bi bi-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.FormioResourceConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBS2hFLE1BSWEsNkJBQTZCO0lBSS9CO0lBQ0E7SUFDQTtJQUNBO0lBTkYsT0FBTyxDQUFvQjtJQUMzQixTQUFTLENBQW9CO0lBQ3BDLFlBQ1MsT0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLE1BQTRCO1FBSDVCLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRLENBQUMsVUFBZTtRQUN0QixJQUFJLENBQUMsT0FBTzthQUNULElBQUksQ0FBQyxVQUFVLENBQUM7YUFDaEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDL0QsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3ZCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO3VHQTFCVSw2QkFBNkI7MkZBQTdCLDZCQUE2QixvRENUMUMsdWJBYUE7O1NESmEsNkJBQTZCOzJGQUE3Qiw2QkFBNkI7a0JBSnpDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi9yZXNvdXJjZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VDb25maWcgfSBmcm9tICcuLi9yZXNvdXJjZS5jb25maWcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc3R5bGVVcmxzOiBbJy4vY3JlYXRlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NyZWF0ZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb1Jlc291cmNlQ3JlYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgcHVibGljIG9uU3VjY2VzczogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgc2VydmljZTogRm9ybWlvUmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBjb25maWc6IEZvcm1pb1Jlc291cmNlQ29uZmlnXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm9uU3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXJ2aWNlLmluaXQodGhpcy5yb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChzdWJtaXNzaW9uOiBhbnkpIHtcclxuICAgIHRoaXMuc2VydmljZVxyXG4gICAgICAuc2F2ZShzdWJtaXNzaW9uKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCB0aGlzLnNlcnZpY2UucmVzb3VyY2UuX2lkLCAndmlldyddLCB7XHJcbiAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHRoaXMub25FcnJvci5lbWl0KGVycikpO1xyXG4gIH1cclxufVxyXG4iLCI8aDMgKm5nSWY9XCJzZXJ2aWNlLmZvcm1cIiBzdHlsZT1cIm1hcmdpbi10b3A6MDtcIj5cclxuICA8YSByb3V0ZXJMaW5rPVwiLi4vXCIgY2xhc3M9XCJiYWNrLWJ1dHRvblwiPlxyXG4gICAgPGVtIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1sZWZ0IGJpIGJpLWNoZXZyb24tbGVmdFwiPjwvZW0+XHJcbiAgPC9hPiB8IE5ldyB7eyBzZXJ2aWNlLmZvcm0udGl0bGUgfX1cclxuPC9oMz5cclxuPGZvcm1pb1xyXG4gIFtmb3JtXT1cInNlcnZpY2UuZm9ybVwiXHJcbiAgW3N1Ym1pc3Npb25dPVwic2VydmljZS5yZXNvdXJjZVwiXHJcbiAgW3JlZnJlc2hdPVwic2VydmljZS5yZWZyZXNoXCJcclxuICBbZXJyb3JdPVwib25FcnJvclwiXHJcbiAgW3N1Y2Nlc3NdPVwib25TdWNjZXNzXCJcclxuICAoc3VibWl0KT1cIm9uU3VibWl0KCRldmVudClcIlxyXG4+PC9mb3JtaW8+XHJcbiJdfQ==