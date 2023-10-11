import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular/auth";
class FormioResources {
    auth;
    resources = {};
    error;
    onError;
    constructor(auth) {
        this.auth = auth;
        this.error = new EventEmitter();
        this.onError = this.error;
        this.resources = {
            currentUser: {
                resourceLoaded: this.auth.userReady
            }
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResources, deps: [{ token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResources });
}
export { FormioResources };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResources, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9yZXNvdXJjZS9zcmMvcmVzb3VyY2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU96RCxNQUNhLGVBQWU7SUFLakI7SUFKVCxTQUFTLEdBQXNCLEVBQUUsQ0FBQztJQUNsQyxLQUFLLENBQW9CO0lBQ3pCLE9BQU8sQ0FBb0I7SUFDM0IsWUFDUyxJQUF3QjtRQUF4QixTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUUvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixXQUFXLEVBQUU7Z0JBQ1gsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUzthQUNwQztTQUNGLENBQUM7SUFDSixDQUFDO3VHQWRVLGVBQWU7MkdBQWYsZUFBZTs7U0FBZixlQUFlOzJGQUFmLGVBQWU7a0JBRDNCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFNlcnZpY2UgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXIvYXV0aCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1pb1Jlc291cmNlTWFwIHtcclxuICBbbmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNvdXJjZXMge1xyXG4gIHJlc291cmNlczogRm9ybWlvUmVzb3VyY2VNYXAgPSB7fTtcclxuICBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgYXV0aD86IEZvcm1pb0F1dGhTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5vbkVycm9yID0gdGhpcy5lcnJvcjtcclxuICAgIHRoaXMucmVzb3VyY2VzID0ge1xyXG4gICAgICBjdXJyZW50VXNlcjoge1xyXG4gICAgICAgIHJlc291cmNlTG9hZGVkOiB0aGlzLmF1dGgudXNlclJlYWR5XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==