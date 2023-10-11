import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../auth.service";
import * as i2 from "@formio/angular";
class FormioAuthLoginComponent {
    service;
    renderOptions = {
        submitOnEnter: true
    };
    constructor(service) {
        this.service = service;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuthLoginComponent, deps: [{ token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioAuthLoginComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.loginForm\" [renderOptions]=\"renderOptions\" (submit)=\"service.onLoginSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
}
export { FormioAuthLoginComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuthLoginComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.loginForm\" [renderOptions]=\"renderOptions\" (submit)=\"service.onLoginSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvbG9naW4vbG9naW4uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvbG9naW4vbG9naW4uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUUxQyxNQUdhLHdCQUF3QjtJQUloQjtJQUhaLGFBQWEsR0FBUTtRQUMxQixhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBQ0YsWUFBbUIsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7SUFBRyxDQUFDO3VHQUp0Qyx3QkFBd0I7MkZBQXhCLHdCQUF3QixvRENMckMsZ0lBQ0E7O1NESWEsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBSHBDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9hdXRoLnNlcnZpY2UnO1xyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9BdXRoTG9naW5Db21wb25lbnQge1xyXG4gIHB1YmxpYyByZW5kZXJPcHRpb25zOiBhbnkgPSB7XHJcbiAgICBzdWJtaXRPbkVudGVyOiB0cnVlXHJcbiAgfTtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VydmljZTogRm9ybWlvQXV0aFNlcnZpY2UpIHt9XHJcbn1cclxuIiwiPGZvcm1pbyBbc3JjXT1cInNlcnZpY2UubG9naW5Gb3JtXCIgW3JlbmRlck9wdGlvbnNdPVwicmVuZGVyT3B0aW9uc1wiIChzdWJtaXQpPVwic2VydmljZS5vbkxvZ2luU3VibWl0KCRldmVudClcIj48L2Zvcm1pbz5cclxuIl19