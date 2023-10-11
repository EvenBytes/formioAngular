import { Component } from '@angular/core';
import { Formio } from '@formio/js';
import * as i0 from "@angular/core";
import * as i1 from "../resource.service";
import * as i2 from "../resource.config";
import * as i3 from "@formio/angular";
class FormioResourceViewComponent {
    service;
    config;
    constructor(service, config) {
        this.service = service;
        this.config = config;
    }
    submission = { data: {} };
    ngOnDestroy() {
        Formio.clearCache();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceViewComponent, deps: [{ token: i1.FormioResourceService }, { token: i2.FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceViewComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i3.FormioComponent, selector: "formio" }] });
}
export { FormioResourceViewComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormioResourceService }, { type: i2.FormioResourceConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9yZXNvdXJjZS9zcmMvdmlldy92aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy92aWV3L3ZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sWUFBWSxDQUFDOzs7OztBQUVsQyxNQUdhLDJCQUEyQjtJQUU3QjtJQUNBO0lBRlQsWUFDUyxPQUE4QixFQUM5QixNQUE0QjtRQUQ1QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFzQjtJQUNsQyxDQUFDO0lBQ0csVUFBVSxHQUFHLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO0lBRS9CLFdBQVc7UUFDVCxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzt1R0FUVSwyQkFBMkI7MkZBQTNCLDJCQUEyQixvRENSeEMsaUtBTUE7O1NERWEsMkJBQTJCOzJGQUEzQiwyQkFBMkI7a0JBSHZDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29uZmlnIH0gZnJvbSAnLi4vcmVzb3VyY2UuY29uZmlnJztcclxuaW1wb3J0IHtGb3JtaW99IGZyb20gJ0Bmb3JtaW8vanMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXcuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNvdXJjZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgc2VydmljZTogRm9ybWlvUmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgcHVibGljIGNvbmZpZzogRm9ybWlvUmVzb3VyY2VDb25maWdcclxuICApIHt9XHJcbiAgcHVibGljIHN1Ym1pc3Npb24gPSB7ZGF0YToge319O1xyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIEZvcm1pby5jbGVhckNhY2hlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtaW9cclxuICBbZm9ybV09XCJzZXJ2aWNlLmZvcm1cIlxyXG4gIFtzdWJtaXNzaW9uXT1cInNlcnZpY2UucmVzb3VyY2VcIlxyXG4gIFtoaWRlQ29tcG9uZW50c109XCJjb25maWcucGFyZW50c1wiXHJcbiAgW3JlYWRPbmx5XT1cInRydWVcIlxyXG4+PC9mb3JtaW8+XHJcbiJdfQ==