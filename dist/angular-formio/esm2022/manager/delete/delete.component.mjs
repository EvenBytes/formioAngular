import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "@formio/angular";
import * as i4 from "@formio/angular/grid";
class FormManagerDeleteComponent {
    managerService;
    router;
    route;
    alerts;
    gridService;
    constructor(managerService, router, route, alerts, gridService) {
        this.managerService = managerService;
        this.router = router;
        this.route = route;
        this.alerts = alerts;
        this.gridService = gridService;
    }
    onDelete() {
        this.managerService.formio.deleteForm().then(() => {
            if (this.gridService) {
                const currentPage = +localStorage.getItem('currentPage') || 0;
                const formsNumberPerPage = this.gridService.getFormsPerPage();
                if (formsNumberPerPage === 1 && currentPage !== 0) {
                    localStorage.setItem('currentPage', `${currentPage - 1}`);
                }
            }
            this.router.navigate(['../../'], { relativeTo: this.route });
        }).catch(err => this.alerts.setAlert({ type: 'danger', message: (err.message || err) }));
    }
    onCancel() {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerDeleteComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormioAlerts }, { token: i4.GridService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormManagerDeleteComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this form?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n", dependencies: [{ kind: "component", type: i3.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }] });
}
export { FormManagerDeleteComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerDeleteComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this form?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormioAlerts }, { type: i4.GridService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL21hbmFnZXIvc3JjL2RlbGV0ZS9kZWxldGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvZGVsZXRlL2RlbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFNMUMsTUFHYSwwQkFBMEI7SUFFNUI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUxULFlBQ1MsY0FBa0MsRUFDbEMsTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLE1BQW9CLEVBQ3BCLFdBQXlCO1FBSnpCLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYztJQUMvQixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixNQUFNLFdBQVcsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBRTlELElBQUksa0JBQWtCLEtBQUssQ0FBQyxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7b0JBQ2pELFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzNEO2FBQ0Y7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQzt1R0ExQlUsMEJBQTBCOzJGQUExQiwwQkFBMEIsb0RDVHZDLDJXQU1BOztTREdhLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUh0QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb0FsZXJ0cyB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyL2dyaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RlbGV0ZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1NYW5hZ2VyRGVsZXRlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBtYW5hZ2VyU2VydmljZTogRm9ybU1hbmFnZXJTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHB1YmxpYyBhbGVydHM6IEZvcm1pb0FsZXJ0cyxcclxuICAgIHB1YmxpYyBncmlkU2VydmljZT86IEdyaWRTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBvbkRlbGV0ZSgpIHtcclxuICAgIHRoaXMubWFuYWdlclNlcnZpY2UuZm9ybWlvLmRlbGV0ZUZvcm0oKS50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZ3JpZFNlcnZpY2UpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFBhZ2UnKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGZvcm1zTnVtYmVyUGVyUGFnZSA9IHRoaXMuZ3JpZFNlcnZpY2UuZ2V0Rm9ybXNQZXJQYWdlKCk7XHJcblxyXG4gICAgICAgIGlmIChmb3Jtc051bWJlclBlclBhZ2UgPT09IDEgJiYgY3VycmVudFBhZ2UgIT09IDApIHtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UGFnZScsIGAke2N1cnJlbnRQYWdlIC0gMX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vLi4vJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcclxuICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmFsZXJ0cy5zZXRBbGVydCh7dHlwZTogJ2RhbmdlcicsIG1lc3NhZ2U6IChlcnIubWVzc2FnZSB8fCBlcnIpfSkpO1xyXG4gIH1cclxuXHJcbiAgb25DYW5jZWwoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLycsICd2aWV3J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPGZvcm1pby1hbGVydHMgW2FsZXJ0c109XCJhbGVydHNcIj48L2Zvcm1pby1hbGVydHM+XHJcbjxoMz5BcmUgeW91IHN1cmUgeW91IHdpc2ggdG8gZGVsZXRlIHRoaXMgZm9ybT88L2gzPlxyXG48ZGl2IGNsYXNzPVwiYnRuLXRvb2xiYXJcIj5cclxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib25EZWxldGUoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiBzdHlsZT1cIm1hcmdpbi1yaWdodDogMTBweDtcIj5ZZXM8L2J1dHRvbj5cclxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib25DYW5jZWwoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+Tm88L2J1dHRvbj5cclxuPC9kaXY+XHJcbiJdfQ==