import { Component, EventEmitter } from '@angular/core';
import { Formio } from '@formio/js';
import * as i0 from "@angular/core";
import * as i1 from "../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "../form-manager.config";
import * as i4 from "@formio/angular/auth";
import * as i5 from "@angular/common";
import * as i6 from "@formio/angular";
class FormManagerViewComponent {
    service;
    router;
    route;
    config;
    auth;
    submission;
    renderOptions;
    onSuccess = new EventEmitter();
    onError = new EventEmitter();
    onSubmitDone = new EventEmitter();
    constructor(service, router, route, config, auth) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.config = config;
        this.auth = auth;
        this.renderOptions = {
            saveDraft: this.config.saveDraft
        };
        this.submission = { data: {} };
    }
    ngOnInit() {
        this.service.formio = new Formio(this.service.formio.formUrl);
    }
    onSubmit(submission) {
        this.submission.data = submission.data;
        this.submission.state = 'complete';
        this.service.formio.saveSubmission(this.submission).then(saved => {
            this.onSubmitDone.emit(saved);
            this.onSuccess.emit();
            this.router.navigate(['../', 'submission', saved._id], { relativeTo: this.route });
        }).catch((err) => this.onError.emit(err));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerViewComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormManagerConfig }, { token: i4.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormManagerViewComponent, selector: "ng-component", ngImport: i0, template: "<formio *ngIf=\"service.form\"\r\n  [renderer]=\"config.renderer\"\r\n  [renderOptions]=\"renderOptions\"\r\n  [url]=\"service.formio.formUrl\"\r\n  [form]=\"service.form\"\r\n  [submission]=\"submission\"\r\n  [success]=\"onSuccess\"\r\n  [submitDone]=\"onSubmitDone\"\r\n  [error]=\"onError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.FormioComponent, selector: "formio" }] });
}
export { FormManagerViewComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio *ngIf=\"service.form\"\r\n  [renderer]=\"config.renderer\"\r\n  [renderOptions]=\"renderOptions\"\r\n  [url]=\"service.formio.formUrl\"\r\n  [form]=\"service.form\"\r\n  [submission]=\"submission\"\r\n  [success]=\"onSuccess\"\r\n  [submitDone]=\"onSubmitDone\"\r\n  [error]=\"onError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormManagerConfig }, { type: i4.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy92aWV3L3ZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvdmlldy92aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7O0FBRXBDLE1BR2Esd0JBQXdCO0lBTzFCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFWRixVQUFVLENBQU07SUFDaEIsYUFBYSxDQUFNO0lBQ25CLFNBQVMsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNyRCxPQUFPLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkQsWUFBWSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBQy9ELFlBQ1MsT0FBMkIsRUFDM0IsTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLE1BQXlCLEVBQ3pCLElBQXVCO1FBSnZCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUU5QixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7U0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsUUFBUSxDQUFDLFVBQWU7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO3VHQS9CVSx3QkFBd0I7MkZBQXhCLHdCQUF3QixvRENWckMsNlZBV0E7O1NERGEsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBSHBDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybS1tYW5hZ2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhTZXJ2aWNlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyL2F1dGgnO1xyXG5pbXBvcnQgeyBGb3JtaW8gfSBmcm9tICdAZm9ybWlvL2pzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybU1hbmFnZXJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgc3VibWlzc2lvbjogYW55O1xyXG4gIHB1YmxpYyByZW5kZXJPcHRpb25zOiBhbnk7XHJcbiAgcHVibGljIG9uU3VjY2VzczogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHVibGljIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHB1YmxpYyBvblN1Ym1pdERvbmU6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1NYW5hZ2VyU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwdWJsaWMgY29uZmlnOiBGb3JtTWFuYWdlckNvbmZpZyxcclxuICAgIHB1YmxpYyBhdXRoOiBGb3JtaW9BdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5yZW5kZXJPcHRpb25zID0ge1xyXG4gICAgICBzYXZlRHJhZnQ6IHRoaXMuY29uZmlnLnNhdmVEcmFmdFxyXG4gICAgfTtcclxuICAgIHRoaXMuc3VibWlzc2lvbiA9IHtkYXRhOiB7fX07XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VydmljZS5mb3JtaW8gPSBuZXcgRm9ybWlvKHRoaXMuc2VydmljZS5mb3JtaW8uZm9ybVVybCk7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChzdWJtaXNzaW9uOiBhbnkpIHtcclxuICAgIHRoaXMuc3VibWlzc2lvbi5kYXRhID0gc3VibWlzc2lvbi5kYXRhO1xyXG4gICAgdGhpcy5zdWJtaXNzaW9uLnN0YXRlID0gJ2NvbXBsZXRlJztcclxuICAgIHRoaXMuc2VydmljZS5mb3JtaW8uc2F2ZVN1Ym1pc3Npb24odGhpcy5zdWJtaXNzaW9uKS50aGVuKHNhdmVkID0+IHtcclxuICAgICAgdGhpcy5vblN1Ym1pdERvbmUuZW1pdChzYXZlZCk7XHJcbiAgICAgIHRoaXMub25TdWNjZXNzLmVtaXQoKTtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCAnc3VibWlzc2lvbicsIHNhdmVkLl9pZF0sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB0aGlzLm9uRXJyb3IuZW1pdChlcnIpKTtcclxuICB9XHJcbn1cclxuIiwiPGZvcm1pbyAqbmdJZj1cInNlcnZpY2UuZm9ybVwiXHJcbiAgW3JlbmRlcmVyXT1cImNvbmZpZy5yZW5kZXJlclwiXHJcbiAgW3JlbmRlck9wdGlvbnNdPVwicmVuZGVyT3B0aW9uc1wiXHJcbiAgW3VybF09XCJzZXJ2aWNlLmZvcm1pby5mb3JtVXJsXCJcclxuICBbZm9ybV09XCJzZXJ2aWNlLmZvcm1cIlxyXG4gIFtzdWJtaXNzaW9uXT1cInN1Ym1pc3Npb25cIlxyXG4gIFtzdWNjZXNzXT1cIm9uU3VjY2Vzc1wiXHJcbiAgW3N1Ym1pdERvbmVdPVwib25TdWJtaXREb25lXCJcclxuICBbZXJyb3JdPVwib25FcnJvclwiXHJcbiAgKHN1Ym1pdCk9XCJvblN1Ym1pdCgkZXZlbnQpXCJcclxuPjwvZm9ybWlvPlxyXG4iXX0=