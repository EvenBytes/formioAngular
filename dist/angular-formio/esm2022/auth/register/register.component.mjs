import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../auth.service";
import * as i2 from "@formio/angular";
class FormioAuthRegisterComponent {
    service;
    renderOptions = {
        submitOnEnter: true
    };
    constructor(service) {
        this.service = service;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuthRegisterComponent, deps: [{ token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioAuthRegisterComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.registerForm\" [renderOptions]=\"renderOptions\" (submit)=\"service.onRegisterSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
}
export { FormioAuthRegisterComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuthRegisterComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.registerForm\" [renderOptions]=\"renderOptions\" (submit)=\"service.onRegisterSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUUxQyxNQUdhLDJCQUEyQjtJQUluQjtJQUhaLGFBQWEsR0FBUTtRQUMxQixhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBQ0YsWUFBbUIsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7SUFBRyxDQUFDO3VHQUp0QywyQkFBMkI7MkZBQTNCLDJCQUEyQixvRENMeEMsc0lBQ0E7O1NESWEsMkJBQTJCOzJGQUEzQiwyQkFBMkI7a0JBSHZDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9hdXRoLnNlcnZpY2UnO1xyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vcmVnaXN0ZXIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9BdXRoUmVnaXN0ZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyByZW5kZXJPcHRpb25zOiBhbnkgPSB7XHJcbiAgICBzdWJtaXRPbkVudGVyOiB0cnVlXHJcbiAgfTtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VydmljZTogRm9ybWlvQXV0aFNlcnZpY2UpIHt9XHJcbn1cclxuIiwiPGZvcm1pbyBbc3JjXT1cInNlcnZpY2UucmVnaXN0ZXJGb3JtXCIgW3JlbmRlck9wdGlvbnNdPVwicmVuZGVyT3B0aW9uc1wiIChzdWJtaXQpPVwic2VydmljZS5vblJlZ2lzdGVyU3VibWl0KCRldmVudClcIj48L2Zvcm1pbz5cclxuIl19