import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../auth.service";
import * as i2 from "@formio/angular";
class FormioResetPassComponent {
    service;
    constructor(service) {
        this.service = service;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResetPassComponent, deps: [{ token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResetPassComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.resetPassForm\" (submit)=\"service.onResetPassSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
}
export { FormioResetPassComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResetPassComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.resetPassForm\" (submit)=\"service.onResetPassSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXRwYXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2F1dGgvc3JjL3Jlc2V0cGFzcy9yZXNldHBhc3MuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvcmVzZXRwYXNzL3Jlc2V0cGFzcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRTFDLE1BR2Esd0JBQXdCO0lBQ2hCO0lBQW5CLFlBQW1CLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO0lBQUcsQ0FBQzt1R0FEdEMsd0JBQXdCOzJGQUF4Qix3QkFBd0Isb0RDTHJDLHNHQUNBOztTRElhLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQUhwQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC5zZXJ2aWNlJztcclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc2V0cGFzcy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb1Jlc2V0UGFzc0NvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHNlcnZpY2U6IEZvcm1pb0F1dGhTZXJ2aWNlKSB7fVxyXG59XHJcbiIsIjxmb3JtaW8gW3NyY109XCJzZXJ2aWNlLnJlc2V0UGFzc0Zvcm1cIiAoc3VibWl0KT1cInNlcnZpY2Uub25SZXNldFBhc3NTdWJtaXQoJGV2ZW50KVwiPjwvZm9ybWlvPlxyXG4iXX0=