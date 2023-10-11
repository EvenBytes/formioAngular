import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent } from '@formio/angular';
import _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "../form-manager.config";
import * as i4 from "@formio/angular";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
class FormManagerEditComponent {
    service;
    router;
    route;
    config;
    ref;
    alerts;
    builder;
    formTitle;
    formType;
    form;
    loading;
    formReady;
    editMode;
    constructor(service, router, route, config, ref, alerts) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.config = config;
        this.ref = ref;
        this.alerts = alerts;
        this.form = { components: [] };
        this.formReady = false;
        this.loading = false;
        this.editMode = false;
    }
    initBuilder(editing) {
        if (editing) {
            this.loading = true;
            this.editMode = true;
            return this.service.formReady.then(() => {
                this.form = this.service.form;
                this.formTitle.nativeElement.value = this.service.form.title;
                this.formType.nativeElement.value = this.service.form.display || 'form';
                this.formReady = true;
                this.loading = false;
                this.ref.detectChanges();
                return true;
            }).catch(err => {
                this.alerts.setAlert({ type: 'danger', message: (err.message || err) });
                this.loading = false;
                this.ref.detectChanges();
                this.formReady = true;
            });
        }
        else {
            this.formReady = true;
            return Promise.resolve(true);
        }
    }
    ngAfterViewInit() {
        this.route.url.subscribe(url => {
            setTimeout(() => this.initBuilder((url[0].path === 'edit')), 0);
        });
    }
    onDisplaySelect(event) {
        this.builder.setDisplay(event.target.value);
    }
    saveForm() {
        this.loading = true;
        this.form = _.cloneDeep(this.builder.formio.schema);
        this.form.title = this.formTitle.nativeElement.value.trim();
        this.form.display = this.formType.nativeElement.value;
        if (this.config.tag) {
            this.form.tags = this.form.tags || [];
            this.form.tags.push(this.config.tag);
            this.form.tags = _.uniq(this.form.tags);
        }
        if (!this.form._id) {
            this.form.name = _.camelCase(this.form.title).toLowerCase();
            this.form.path = this.form.name;
        }
        return this.service.formio.saveForm(this.form).then(form => {
            this.form = this.service.setForm(form);
            this.loading = false;
            return this.form;
        }).catch(err => {
            this.loading = false;
            // Catch if a form is returned as an error. This is a conflict.
            if (err._id && err.type) {
                throw err;
            }
            this.alerts.setAlert({ type: 'danger', message: (err.message || err) });
        });
    }
    onSave() {
        return this.saveForm().then((form) => {
            if (this.editMode) {
                this.router.navigate(['../', 'view'], { relativeTo: this.route });
            }
            else {
                this.router.navigate(['../', form._id, 'view'], { relativeTo: this.route });
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerEditComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormManagerConfig }, { token: i0.ChangeDetectorRef }, { token: i4.FormioAlerts }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormManagerEditComponent, selector: "ng-component", viewQueries: [{ propertyName: "builder", first: true, predicate: FormBuilderComponent, descendants: true }, { propertyName: "formTitle", first: true, predicate: ["title"], descendants: true }, { propertyName: "formType", first: true, predicate: ["type"], descendants: true }], ngImport: i0, template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row mb-2\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\"><i class=\"bi bi-save me-2\"></i>Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.FormBuilderComponent, selector: "form-builder", inputs: ["form", "options", "formbuilder", "noeval", "refresh", "rebuild"], outputs: ["change"] }, { kind: "component", type: i4.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "directive", type: i6.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i6.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
}
export { FormManagerEditComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row mb-2\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\"><i class=\"bi bi-save me-2\"></i>Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormManagerConfig }, { type: i0.ChangeDetectorRef }, { type: i4.FormioAlerts }]; }, propDecorators: { builder: [{
                type: ViewChild,
                args: [FormBuilderComponent, { static: false }]
            }], formTitle: [{
                type: ViewChild,
                args: ['title', { static: false }]
            }], formType: [{
                type: ViewChild,
                args: ['type', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9lZGl0L2VkaXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvZWRpdC9lZGl0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFnRCxNQUFNLGVBQWUsQ0FBQztBQUtuRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7O0FBRXZCLE1BR2Esd0JBQXdCO0lBVTFCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQWR5QyxPQUFPLENBQXVCO0lBQzNDLFNBQVMsQ0FBYTtJQUN2QixRQUFRLENBQWE7SUFDbEQsSUFBSSxDQUFNO0lBQ1YsT0FBTyxDQUFVO0lBQ2pCLFNBQVMsQ0FBVTtJQUNuQixRQUFRLENBQVU7SUFFekIsWUFDUyxPQUEyQixFQUMzQixNQUFjLEVBQ2QsS0FBcUIsRUFDckIsTUFBeUIsRUFDekIsR0FBc0IsRUFDdEIsTUFBb0I7UUFMcEIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFFM0IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQU87UUFDakIsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO2dCQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUV0RCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQiwrREFBK0Q7WUFDL0QsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3ZCLE1BQU0sR0FBRyxDQUFDO2FBQ1g7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUMzRTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt1R0E5RlUsd0JBQXdCOzJGQUF4Qix3QkFBd0IsNkZBQ3hCLG9CQUFvQix3TkNaakMseTlCQW1CQTs7U0RSYSx3QkFBd0I7MkZBQXhCLHdCQUF3QjtrQkFIcEMsU0FBUzs7c1BBSTBDLE9BQU87c0JBQXhELFNBQVM7dUJBQUMsb0JBQW9CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO2dCQUNYLFNBQVM7c0JBQTdDLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztnQkFDQyxRQUFRO3NCQUEzQyxTQUFTO3VCQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS1tYW5hZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJDb25maWcgfSBmcm9tICcuLi9mb3JtLW1hbmFnZXIuY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL2VkaXQuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtTWFuYWdlckVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICBAVmlld0NoaWxkKEZvcm1CdWlsZGVyQ29tcG9uZW50LCB7c3RhdGljOiBmYWxzZX0pIGJ1aWxkZXI6IEZvcm1CdWlsZGVyQ29tcG9uZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ3RpdGxlJywge3N0YXRpYzogZmFsc2V9KSBmb3JtVGl0bGU6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgndHlwZScsIHtzdGF0aWM6IGZhbHNlfSkgZm9ybVR5cGU6IEVsZW1lbnRSZWY7XHJcbiAgcHVibGljIGZvcm06IGFueTtcclxuICBwdWJsaWMgbG9hZGluZzogQm9vbGVhbjtcclxuICBwdWJsaWMgZm9ybVJlYWR5OiBCb29sZWFuO1xyXG4gIHB1YmxpYyBlZGl0TW9kZTogQm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgc2VydmljZTogRm9ybU1hbmFnZXJTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHB1YmxpYyBjb25maWc6IEZvcm1NYW5hZ2VyQ29uZmlnLFxyXG4gICAgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwdWJsaWMgYWxlcnRzOiBGb3JtaW9BbGVydHNcclxuICApIHtcclxuICAgIHRoaXMuZm9ybSA9IHtjb21wb25lbnRzOiBbXX07XHJcbiAgICB0aGlzLmZvcm1SZWFkeSA9IGZhbHNlO1xyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpbml0QnVpbGRlcihlZGl0aW5nKSB7XHJcbiAgICBpZiAoZWRpdGluZykge1xyXG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5mb3JtUmVhZHkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5zZXJ2aWNlLmZvcm07XHJcbiAgICAgICAgdGhpcy5mb3JtVGl0bGUubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuc2VydmljZS5mb3JtLnRpdGxlO1xyXG4gICAgICAgIHRoaXMuZm9ybVR5cGUubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuc2VydmljZS5mb3JtLmRpc3BsYXkgfHwgJ2Zvcm0nO1xyXG4gICAgICAgIHRoaXMuZm9ybVJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgdGhpcy5hbGVydHMuc2V0QWxlcnQoe3R5cGU6ICdkYW5nZXInLCBtZXNzYWdlOiAoZXJyLm1lc3NhZ2UgfHwgZXJyKX0pO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB0aGlzLmZvcm1SZWFkeSA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtUmVhZHkgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5yb3V0ZS51cmwuc3Vic2NyaWJlKCB1cmwgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW5pdEJ1aWxkZXIoKHVybFswXS5wYXRoID09PSAnZWRpdCcpKSwgMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uRGlzcGxheVNlbGVjdChldmVudCkge1xyXG4gICAgdGhpcy5idWlsZGVyLnNldERpc3BsYXkoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNhdmVGb3JtKCkge1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuZm9ybSA9IF8uY2xvbmVEZWVwKHRoaXMuYnVpbGRlci5mb3JtaW8uc2NoZW1hKTtcclxuICAgIHRoaXMuZm9ybS50aXRsZSA9IHRoaXMuZm9ybVRpdGxlLm5hdGl2ZUVsZW1lbnQudmFsdWUudHJpbSgpO1xyXG4gICAgdGhpcy5mb3JtLmRpc3BsYXkgPSB0aGlzLmZvcm1UeXBlLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLnRhZykge1xyXG4gICAgICB0aGlzLmZvcm0udGFncyA9IHRoaXMuZm9ybS50YWdzIHx8IFtdO1xyXG4gICAgICB0aGlzLmZvcm0udGFncy5wdXNoKHRoaXMuY29uZmlnLnRhZyk7XHJcbiAgICAgIHRoaXMuZm9ybS50YWdzID0gXy51bmlxKHRoaXMuZm9ybS50YWdzKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5mb3JtLl9pZCkge1xyXG4gICAgICB0aGlzLmZvcm0ubmFtZSA9IF8uY2FtZWxDYXNlKHRoaXMuZm9ybS50aXRsZSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdGhpcy5mb3JtLnBhdGggPSB0aGlzLmZvcm0ubmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZm9ybWlvLnNhdmVGb3JtKHRoaXMuZm9ybSkudGhlbihmb3JtID0+IHtcclxuICAgICAgdGhpcy5mb3JtID0gdGhpcy5zZXJ2aWNlLnNldEZvcm0oZm9ybSk7XHJcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3JtO1xyXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIC8vIENhdGNoIGlmIGEgZm9ybSBpcyByZXR1cm5lZCBhcyBhbiBlcnJvci4gVGhpcyBpcyBhIGNvbmZsaWN0LlxyXG4gICAgICBpZiAoZXJyLl9pZCAmJiBlcnIudHlwZSkge1xyXG4gICAgICAgIHRocm93IGVycjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydCh7dHlwZTogJ2RhbmdlcicsIG1lc3NhZ2U6IChlcnIubWVzc2FnZSB8fCBlcnIpfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2F2ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnNhdmVGb3JtKCkudGhlbigoZm9ybSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgJ3ZpZXcnXSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLycsIGZvcm0uX2lkLCAndmlldyddLCB7cmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImxvYWRlclwiICpuZ0lmPVwibG9hZGluZ1wiPjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3cgbWItMlwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tOFwiPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImZvcm1UaXRsZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBUaXRsZVwiICN0aXRsZT5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTJcIj5cclxuICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImZvcm1TZWxlY3RcIiAoY2hhbmdlKT1cIm9uRGlzcGxheVNlbGVjdCgkZXZlbnQpXCIgI3R5cGU+XHJcbiAgICAgIDxvcHRpb24gdmFsdWU9XCJmb3JtXCI+Rm9ybTwvb3B0aW9uPlxyXG4gICAgICA8b3B0aW9uIHZhbHVlPVwid2l6YXJkXCI+V2l6YXJkPC9vcHRpb24+XHJcbiAgICAgIDxvcHRpb24gdmFsdWU9XCJwZGZcIj5QREY8L29wdGlvbj5cclxuICAgIDwvc2VsZWN0PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tMlwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcIiAoY2xpY2spPVwib25TYXZlKClcIj48aSBjbGFzcz1cImJpIGJpLXNhdmUgbWUtMlwiPjwvaT5TYXZlIEZvcm08L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxmb3JtaW8tYWxlcnRzIFthbGVydHNdPVwiYWxlcnRzXCI+PC9mb3JtaW8tYWxlcnRzPlxyXG48Zm9ybS1idWlsZGVyICpuZ0lmPVwiZm9ybVJlYWR5XCIgW2Zvcm1idWlsZGVyXT1cImNvbmZpZy5idWlsZGVyXCIgW2Zvcm1dPVwiZm9ybVwiICNidWlsZGVyPjwvZm9ybS1idWlsZGVyPlxyXG48YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAxMHB4O1wiIChjbGljayk9XCJvblNhdmUoKVwiPlNhdmUgRm9ybTwvYnV0dG9uPlxyXG4iXX0=