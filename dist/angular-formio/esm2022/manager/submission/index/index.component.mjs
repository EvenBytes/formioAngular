import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "@formio/angular/grid";
class SubmissionIndexComponent {
    service;
    route;
    router;
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    onSelect(row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionIndexComponent, deps: [{ token: i1.FormManagerService }, { token: i2.ActivatedRoute }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionIndexComponent, selector: "ng-component", ngImport: i0, template: "<formio-grid [formio]=\"service.formio\" (rowSelect)=\"onSelect($event)\"></formio-grid>\r\n", dependencies: [{ kind: "component", type: i3.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
}
export { SubmissionIndexComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-grid [formio]=\"service.formio\" (rowSelect)=\"onSelect($event)\"></formio-grid>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.ActivatedRoute }, { type: i2.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvc3VibWlzc2lvbi9pbmRleC9pbmRleC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9zdWJtaXNzaW9uL2luZGV4L2luZGV4LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSTFDLE1BR2Esd0JBQXdCO0lBRTFCO0lBQ0E7SUFDQTtJQUhULFlBQ1MsT0FBMkIsRUFDM0IsS0FBcUIsRUFDckIsTUFBYztRQUZkLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDcEIsQ0FBQztJQUVKLFFBQVEsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7dUdBVFUsd0JBQXdCOzJGQUF4Qix3QkFBd0Isb0RDUHJDLDhGQUNBOztTRE1hLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQUhwQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9mb3JtLW1hbmFnZXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vaW5kZXguY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdWJtaXNzaW9uSW5kZXhDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IEZvcm1NYW5hZ2VyU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIG9uU2VsZWN0KHJvdzogYW55KSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm93Ll9pZCwgJ3ZpZXcnXSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcclxuICB9XHJcbn1cclxuIiwiPGZvcm1pby1ncmlkIFtmb3JtaW9dPVwic2VydmljZS5mb3JtaW9cIiAocm93U2VsZWN0KT1cIm9uU2VsZWN0KCRldmVudClcIj48L2Zvcm1pby1ncmlkPlxyXG4iXX0=