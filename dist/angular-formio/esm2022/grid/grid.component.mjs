import { GridFooterPositions } from './types/grid-footer-positions';
import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { each } from 'lodash';
import { Formio } from '@formio/js';
import FormComponents from './form/index';
import SubmissionComponents from './submission/index';
import { FormioPromiseService } from '@formio/angular';
import { SortType } from './types/grid-header';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular";
import * as i2 from "@angular/common";
class FormioGridComponent {
    alerts;
    resolver;
    ref;
    footerPosition = GridFooterPositions.bottom;
    src;
    items;
    onForm;
    query;
    refresh;
    columns;
    gridType;
    size;
    components;
    formio;
    label;
    createText;
    isActionAllowed;
    select;
    rowSelect;
    rowAction;
    createItem;
    error;
    headerElement;
    bodyElement;
    footerElement;
    page = 0;
    isLoading = false;
    initialized = false;
    header;
    body;
    footer;
    footerPositions = GridFooterPositions;
    constructor(alerts, resolver, ref) {
        this.alerts = alerts;
        this.resolver = resolver;
        this.ref = ref;
        this.select = this.rowSelect = new EventEmitter();
        this.rowAction = new EventEmitter();
        this.createItem = new EventEmitter();
        this.error = new EventEmitter();
        this.isLoading = true;
    }
    createComponent(property, component) {
        const factory = this.resolver.resolveComponentFactory(component);
        const componentRef = property.createComponent(factory);
        return componentRef.instance;
    }
    loadGrid(src) {
        // If no source is provided, then skip.
        if (!src && !this.formio) {
            return;
        }
        // Do not double load.
        if (this.formio && this.src && (src === this.src)) {
            return;
        }
        if (src) {
            this.src = src;
            this.formio = new FormioPromiseService(this.src, { formOnly: true });
        }
        // Load the header.
        this.header.load(this.formio, {}, this.columns)
            .then(() => this.setPage(0))
            .catch(error => this.onError(error));
    }
    ngOnInit() {
        // Create our components.
        const comps = this.components || ((this.gridType === 'form') ? FormComponents : SubmissionComponents);
        this.header = this.createComponent(this.headerElement, comps.header);
        this.header.actionAllowed = this.actionAllowed.bind(this);
        this.header.sort.subscribe(header => this.sortColumn(header));
        this.body = this.createComponent(this.bodyElement, comps.body);
        this.body.header = this.header;
        this.body.actionAllowed = this.actionAllowed.bind(this);
        this.body.rowSelect.subscribe(row => this.rowSelect.emit(row));
        this.body.rowAction.subscribe(action => this.rowAction.emit(action));
        this.footer = this.createComponent(this.footerElement, comps.footer);
        this.footer.header = this.header;
        this.footer.body = this.body;
        this.footer.actionAllowed = this.actionAllowed.bind(this);
        this.footer.createText = this.createText;
        this.footer.size = this.size;
        this.footer.pageChanged.subscribe(page => this.pageChanged(page));
        this.footer.createItem.subscribe(item => this.createItem.emit(item));
    }
    ngOnChanges(changes) {
        if (this.initialized) {
            if ((changes.src && changes.src.currentValue) ||
                (changes.formio && changes.formio.currentValue)) {
                this.loadGrid(changes.src.currentValue);
            }
            if (changes.items && changes.items.currentValue) {
                this.refreshGrid();
            }
        }
        if (this.footer &&
            (changes.createText && changes.createText.currentValue)) {
            this.footer.createText = changes.createText.currentValue;
        }
    }
    ngAfterViewInit() {
        this.alerts.setAlerts([]);
        this.query = this.query || {};
        if (this.refresh) {
            this.refresh.subscribe((query) => this.refreshGrid(query));
        }
        this.loadGrid(this.src);
        this.initialized = true;
        this.ref.detectChanges();
    }
    actionAllowed(action) {
        if (this.isActionAllowed) {
            return this.isActionAllowed(action);
        }
        else {
            return true;
        }
    }
    onError(error) {
        this.isLoading = false;
        this.error.emit(error);
        if (typeof error === 'string' || error.message) {
            this.alerts.setAlert({
                type: 'danger',
                message: error.message || error
            });
        }
    }
    refreshGrid(query) {
        this.alerts.setAlerts([]);
        this.query = query || this.query;
        if (!this.query.hasOwnProperty('limit')) {
            this.query.limit = 10;
        }
        if (!this.query.hasOwnProperty('skip')) {
            this.query.skip = 0;
        }
        this.isLoading = true;
        this.ref.detectChanges();
        Formio.cache = {};
        let loader = null;
        if (this.items) {
            loader = Promise.resolve(this.body.setRows(this.query, this.items));
        }
        else {
            loader = this.body.load(this.formio, this.query);
        }
        return loader.then(info => {
            this.isLoading = false;
            this.initialized = true;
            this.ref.detectChanges();
        }).catch(error => this.onError(error));
    }
    setPage(num = -1) {
        this.page = num !== -1 ? num : this.page;
        if (!this.query.hasOwnProperty('limit')) {
            this.query.limit = 10;
        }
        if (!this.query.hasOwnProperty('skip')) {
            this.query.skip = 0;
        }
        this.query.skip = this.page * this.query.limit;
        this.refreshGrid();
    }
    sortColumn(header) {
        // Reset all other column sorts.
        each(this.header.headers, (col) => {
            if (col.key !== header.key) {
                col.sort = '';
            }
        });
        switch (header.sort) {
            case 'asc':
                header.sort = SortType.DESC;
                this.query.sort = '-' + header.key;
                break;
            case 'desc':
                header.sort = undefined;
                delete this.query.sort;
                break;
            case undefined:
                header.sort = SortType.ASC;
                this.query.sort = header.key;
                break;
        }
        this.refreshGrid();
    }
    pageChanged(page) {
        this.setPage(page.page - 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGridComponent, deps: [{ token: i1.FormioAlerts }, { token: i0.ComponentFactoryResolver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioGridComponent, selector: "formio-grid", inputs: { footerPosition: "footerPosition", src: "src", items: "items", onForm: "onForm", query: "query", refresh: "refresh", columns: "columns", gridType: "gridType", size: "size", components: "components", formio: "formio", label: "label", createText: "createText", isActionAllowed: "isActionAllowed" }, outputs: { select: "select", rowSelect: "rowSelect", rowAction: "rowAction", createItem: "createItem", error: "error" }, viewQueries: [{ propertyName: "headerElement", first: true, predicate: ["headerTemplate"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "bodyElement", first: true, predicate: ["bodyTemplate"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "footerElement", first: true, predicate: ["footerTemplate"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template #headerTemplate></ng-template>\r\n<ng-template #bodyTemplate></ng-template>\r\n<ng-template #footerTemplate></ng-template>\r\n<div class=\"formio-grid\">\r\n  <formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n  <table class=\"table table-bordered table-striped table-hover\">\r\n    <ng-container *ngIf=\"initialized && [footerPositions.top, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.top, label: label }\">\r\n    </ng-container>\r\n    <ng-container *ngIf=\"initialized\"\r\n      [ngTemplateOutlet]=\"header.template\"></ng-container>\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n    <ng-container *ngIf=\"initialized\" [ngTemplateOutlet]=\"body.template\"></ng-container>\r\n    <ng-container *ngIf=\"initialized && [footerPositions.bottom, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.bottom, label: label }\">\r\n    </ng-container>\r\n  </table>\r\n</div>\r\n", styles: [".formio-grid{position:relative;width:100%}.grid-refresh{height:400px;width:100%}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i1.FormioLoaderComponent, selector: "formio-loader", inputs: ["isLoading"] }, { kind: "component", type: i1.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }] });
}
export { FormioGridComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio-grid', template: "<ng-template #headerTemplate></ng-template>\r\n<ng-template #bodyTemplate></ng-template>\r\n<ng-template #footerTemplate></ng-template>\r\n<div class=\"formio-grid\">\r\n  <formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n  <table class=\"table table-bordered table-striped table-hover\">\r\n    <ng-container *ngIf=\"initialized && [footerPositions.top, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.top, label: label }\">\r\n    </ng-container>\r\n    <ng-container *ngIf=\"initialized\"\r\n      [ngTemplateOutlet]=\"header.template\"></ng-container>\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n    <ng-container *ngIf=\"initialized\" [ngTemplateOutlet]=\"body.template\"></ng-container>\r\n    <ng-container *ngIf=\"initialized && [footerPositions.bottom, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.bottom, label: label }\">\r\n    </ng-container>\r\n  </table>\r\n</div>\r\n", styles: [".formio-grid{position:relative;width:100%}.grid-refresh{height:400px;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormioAlerts }, { type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerPosition: [{
                type: Input
            }], src: [{
                type: Input
            }], items: [{
                type: Input
            }], onForm: [{
                type: Input
            }], query: [{
                type: Input
            }], refresh: [{
                type: Input
            }], columns: [{
                type: Input
            }], gridType: [{
                type: Input
            }], size: [{
                type: Input
            }], components: [{
                type: Input
            }], formio: [{
                type: Input
            }], label: [{
                type: Input
            }], createText: [{
                type: Input
            }], isActionAllowed: [{
                type: Input
            }], select: [{
                type: Output
            }], rowSelect: [{
                type: Output
            }], rowAction: [{
                type: Output
            }], createItem: [{
                type: Output
            }], error: [{
                type: Output
            }], headerElement: [{
                type: ViewChild,
                args: ['headerTemplate', { read: ViewContainerRef, static: true }]
            }], bodyElement: [{
                type: ViewChild,
                args: ['bodyTemplate', { read: ViewContainerRef, static: true }]
            }], footerElement: [{
                type: ViewChild,
                args: ['footerTemplate', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9ncmlkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL2dyaWQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUdMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUlsQyxPQUFPLGNBQWMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxvQkFBb0IsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVyRCxPQUFPLEVBQWEsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFekQsTUFLYSxtQkFBbUI7SUFpQ3JCO0lBQ0M7SUFDQTtJQWxDRCxjQUFjLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDO0lBQzVDLEdBQUcsQ0FBVTtJQUNiLEtBQUssQ0FBYztJQUNuQixNQUFNLENBQWdCO0lBQ3RCLEtBQUssQ0FBTztJQUNaLE9BQU8sQ0FBd0I7SUFDL0IsT0FBTyxDQUFxQjtJQUM1QixRQUFRLENBQVU7SUFDbEIsSUFBSSxDQUFVO0lBQ2QsVUFBVSxDQUFPO0lBQ2pCLE1BQU0sQ0FBd0I7SUFDOUIsS0FBSyxDQUFVO0lBQ2YsVUFBVSxDQUFTO0lBQ25CLGVBQWUsQ0FBTTtJQUNwQixNQUFNLENBQXVCO0lB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RSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQUNBLFdBQVc7c0JBQTdFLFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBQ0ksYUFBYTtzQkFBakYsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JpZEZvb3RlclBvc2l0aW9ucyB9IGZyb20gJy4vdHlwZXMvZ3JpZC1mb290ZXItcG9zaXRpb25zJztcclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Rm9ybWlvQWxlcnRzfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQge2VhY2h9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7Rm9ybWlvfSBmcm9tICdAZm9ybWlvL2pzJztcclxuaW1wb3J0IHtHcmlkSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuL0dyaWRIZWFkZXJDb21wb25lbnQnO1xyXG5pbXBvcnQge0dyaWRCb2R5Q29tcG9uZW50fSBmcm9tICcuL0dyaWRCb2R5Q29tcG9uZW50JztcclxuaW1wb3J0IHtHcmlkRm9vdGVyQ29tcG9uZW50fSBmcm9tICcuL0dyaWRGb290ZXJDb21wb25lbnQnO1xyXG5pbXBvcnQgRm9ybUNvbXBvbmVudHMgZnJvbSAnLi9mb3JtL2luZGV4JztcclxuaW1wb3J0IFN1Ym1pc3Npb25Db21wb25lbnRzIGZyb20gJy4vc3VibWlzc2lvbi9pbmRleCc7XHJcbmltcG9ydCB7Rm9ybWlvUHJvbWlzZVNlcnZpY2V9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbmltcG9ydCB7R3JpZENvbHVtbn0gZnJvbSAnLi90eXBlcy9ncmlkLWNvbHVtbic7XHJcbmltcG9ydCB7R3JpZEhlYWRlciwgU29ydFR5cGV9IGZyb20gJy4vdHlwZXMvZ3JpZC1oZWFkZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmb3JtaW8tZ3JpZCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBmb290ZXJQb3NpdGlvbiA9IEdyaWRGb290ZXJQb3NpdGlvbnMuYm90dG9tO1xyXG4gIEBJbnB1dCgpIHNyYz86IHN0cmluZztcclxuICBASW5wdXQoKSBpdGVtcz86IEFycmF5PGFueT47XHJcbiAgQElucHV0KCkgb25Gb3JtPzogUHJvbWlzZTxhbnk+O1xyXG4gIEBJbnB1dCgpIHF1ZXJ5PzogYW55O1xyXG4gIEBJbnB1dCgpIHJlZnJlc2g/OiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBASW5wdXQoKSBjb2x1bW5zPzogQXJyYXk8R3JpZENvbHVtbj47XHJcbiAgQElucHV0KCkgZ3JpZFR5cGU/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2l6ZT86IG51bWJlcjtcclxuICBASW5wdXQoKSBjb21wb25lbnRzPzogYW55O1xyXG4gIEBJbnB1dCgpIGZvcm1pbz86IEZvcm1pb1Byb21pc2VTZXJ2aWNlO1xyXG4gIEBJbnB1dCgpIGxhYmVsPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNyZWF0ZVRleHQ6IFN0cmluZztcclxuICBASW5wdXQoKSBpc0FjdGlvbkFsbG93ZWQ6IGFueTtcclxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBAT3V0cHV0KCkgcm93U2VsZWN0OiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBAT3V0cHV0KCkgcm93QWN0aW9uOiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBAT3V0cHV0KCkgY3JlYXRlSXRlbTogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQE91dHB1dCgpIGVycm9yOiBFdmVudEVtaXR0ZXI8YW55PjtcclxuICBAVmlld0NoaWxkKCdoZWFkZXJUZW1wbGF0ZScsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBoZWFkZXJFbGVtZW50OiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2JvZHlUZW1wbGF0ZScsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBib2R5RWxlbWVudDogVmlld0NvbnRhaW5lclJlZjtcclxuICBAVmlld0NoaWxkKCdmb290ZXJUZW1wbGF0ZScsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBmb290ZXJFbGVtZW50OiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICBwdWJsaWMgcGFnZSA9IDA7XHJcbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBoZWFkZXI6IEdyaWRIZWFkZXJDb21wb25lbnQ7XHJcbiAgcHVibGljIGJvZHk6IEdyaWRCb2R5Q29tcG9uZW50O1xyXG4gIHB1YmxpYyBmb290ZXI6IEdyaWRGb290ZXJDb21wb25lbnQ7XHJcbiAgcHVibGljIGZvb3RlclBvc2l0aW9ucyA9IEdyaWRGb290ZXJQb3NpdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGFsZXJ0czogRm9ybWlvQWxlcnRzLFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdCA9IHRoaXMucm93U2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5yb3dBY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ29tcG9uZW50KHByb3BlcnR5LCBjb21wb25lbnQpIHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XHJcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBwcm9wZXJ0eS5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XHJcbiAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgbG9hZEdyaWQoc3JjPzogc3RyaW5nKSB7XHJcbiAgICAvLyBJZiBubyBzb3VyY2UgaXMgcHJvdmlkZWQsIHRoZW4gc2tpcC5cclxuICAgIGlmICghc3JjICYmICF0aGlzLmZvcm1pbykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBEbyBub3QgZG91YmxlIGxvYWQuXHJcbiAgICBpZiAodGhpcy5mb3JtaW8gJiYgdGhpcy5zcmMgJiYgKHNyYyA9PT0gdGhpcy5zcmMpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3JjKSB7XHJcbiAgICAgIHRoaXMuc3JjID0gc3JjO1xyXG4gICAgICB0aGlzLmZvcm1pbyA9IG5ldyBGb3JtaW9Qcm9taXNlU2VydmljZSh0aGlzLnNyYywgeyBmb3JtT25seTogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMb2FkIHRoZSBoZWFkZXIuXHJcbiAgICB0aGlzLmhlYWRlci5sb2FkKHRoaXMuZm9ybWlvLCB7fSwgdGhpcy5jb2x1bW5zKVxyXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnNldFBhZ2UoMCkpXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gQ3JlYXRlIG91ciBjb21wb25lbnRzLlxyXG4gICAgY29uc3QgY29tcHMgPSB0aGlzLmNvbXBvbmVudHMgfHwgKCh0aGlzLmdyaWRUeXBlID09PSAnZm9ybScpID8gRm9ybUNvbXBvbmVudHMgOiBTdWJtaXNzaW9uQ29tcG9uZW50cyk7XHJcblxyXG4gICAgdGhpcy5oZWFkZXIgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudCh0aGlzLmhlYWRlckVsZW1lbnQsIGNvbXBzLmhlYWRlcik7XHJcbiAgICB0aGlzLmhlYWRlci5hY3Rpb25BbGxvd2VkID0gdGhpcy5hY3Rpb25BbGxvd2VkLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmhlYWRlci5zb3J0LnN1YnNjcmliZShoZWFkZXIgPT4gdGhpcy5zb3J0Q29sdW1uKGhlYWRlcikpO1xyXG5cclxuICAgIHRoaXMuYm9keSA9IHRoaXMuY3JlYXRlQ29tcG9uZW50KHRoaXMuYm9keUVsZW1lbnQsIGNvbXBzLmJvZHkpO1xyXG4gICAgdGhpcy5ib2R5LmhlYWRlciA9IHRoaXMuaGVhZGVyO1xyXG4gICAgdGhpcy5ib2R5LmFjdGlvbkFsbG93ZWQgPSB0aGlzLmFjdGlvbkFsbG93ZWQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuYm9keS5yb3dTZWxlY3Quc3Vic2NyaWJlKHJvdyA9PiB0aGlzLnJvd1NlbGVjdC5lbWl0KHJvdykpO1xyXG4gICAgdGhpcy5ib2R5LnJvd0FjdGlvbi5zdWJzY3JpYmUoYWN0aW9uID0+IHRoaXMucm93QWN0aW9uLmVtaXQoYWN0aW9uKSk7XHJcblxyXG4gICAgdGhpcy5mb290ZXIgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudCh0aGlzLmZvb3RlckVsZW1lbnQsIGNvbXBzLmZvb3Rlcik7XHJcbiAgICB0aGlzLmZvb3Rlci5oZWFkZXIgPSB0aGlzLmhlYWRlcjtcclxuICAgIHRoaXMuZm9vdGVyLmJvZHkgPSB0aGlzLmJvZHk7XHJcbiAgICB0aGlzLmZvb3Rlci5hY3Rpb25BbGxvd2VkID0gdGhpcy5hY3Rpb25BbGxvd2VkLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmZvb3Rlci5jcmVhdGVUZXh0ID0gdGhpcy5jcmVhdGVUZXh0O1xyXG4gICAgdGhpcy5mb290ZXIuc2l6ZSA9IHRoaXMuc2l6ZTtcclxuICAgIHRoaXMuZm9vdGVyLnBhZ2VDaGFuZ2VkLnN1YnNjcmliZShwYWdlID0+IHRoaXMucGFnZUNoYW5nZWQocGFnZSkpO1xyXG4gICAgdGhpcy5mb290ZXIuY3JlYXRlSXRlbS5zdWJzY3JpYmUoaXRlbSA9PiB0aGlzLmNyZWF0ZUl0ZW0uZW1pdChpdGVtKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAoY2hhbmdlcy5zcmMgJiYgY2hhbmdlcy5zcmMuY3VycmVudFZhbHVlKSB8fFxyXG4gICAgICAgIChjaGFuZ2VzLmZvcm1pbyAmJiBjaGFuZ2VzLmZvcm1pby5jdXJyZW50VmFsdWUpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZEdyaWQoY2hhbmdlcy5zcmMuY3VycmVudFZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYW5nZXMuaXRlbXMgJiYgY2hhbmdlcy5pdGVtcy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hHcmlkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb290ZXIgJiZcclxuICAgICAgICAoY2hhbmdlcy5jcmVhdGVUZXh0ICYmIGNoYW5nZXMuY3JlYXRlVGV4dC5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuZm9vdGVyLmNyZWF0ZVRleHQgPSBjaGFuZ2VzLmNyZWF0ZVRleHQuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5hbGVydHMuc2V0QWxlcnRzKFtdKTtcclxuICAgIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xyXG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKChxdWVyeTogb2JqZWN0KSA9PiB0aGlzLnJlZnJlc2hHcmlkKHF1ZXJ5KSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvYWRHcmlkKHRoaXMuc3JjKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgYWN0aW9uQWxsb3dlZChhY3Rpb24pIHtcclxuICAgIGlmICh0aGlzLmlzQWN0aW9uQWxsb3dlZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pc0FjdGlvbkFsbG93ZWQoYWN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25FcnJvcihlcnJvcjogYW55KSB7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcclxuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnIHx8IGVycm9yLm1lc3NhZ2UpIHtcclxuICAgICAgdGhpcy5hbGVydHMuc2V0QWxlcnQoe1xyXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWZyZXNoR3JpZChxdWVyeT86IGFueSkge1xyXG4gICAgdGhpcy5hbGVydHMuc2V0QWxlcnRzKFtdKTtcclxuICAgIHRoaXMucXVlcnkgPSBxdWVyeSB8fCB0aGlzLnF1ZXJ5O1xyXG4gICAgaWYgKCF0aGlzLnF1ZXJ5Lmhhc093blByb3BlcnR5KCdsaW1pdCcpKSB7XHJcbiAgICAgIHRoaXMucXVlcnkubGltaXQgPSAxMDtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5xdWVyeS5oYXNPd25Qcm9wZXJ0eSgnc2tpcCcpKSB7XHJcbiAgICAgIHRoaXMucXVlcnkuc2tpcCA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICBGb3JtaW8uY2FjaGUgPSB7fTtcclxuICAgIGxldCBsb2FkZXIgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuaXRlbXMpIHtcclxuICAgICAgbG9hZGVyID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuYm9keS5zZXRSb3dzKHRoaXMucXVlcnksIHRoaXMuaXRlbXMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvYWRlciA9IHRoaXMuYm9keS5sb2FkKHRoaXMuZm9ybWlvLCB0aGlzLnF1ZXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbG9hZGVyLnRoZW4oaW5mbyA9PiB7XHJcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHNldFBhZ2UobnVtID0gLTEpIHtcclxuICAgIHRoaXMucGFnZSA9IG51bSAhPT0gLTEgPyBudW0gOiB0aGlzLnBhZ2U7XHJcbiAgICBpZiAoIXRoaXMucXVlcnkuaGFzT3duUHJvcGVydHkoJ2xpbWl0JykpIHtcclxuICAgICAgdGhpcy5xdWVyeS5saW1pdCA9IDEwO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnF1ZXJ5Lmhhc093blByb3BlcnR5KCdza2lwJykpIHtcclxuICAgICAgdGhpcy5xdWVyeS5za2lwID0gMDtcclxuICAgIH1cclxuICAgIHRoaXMucXVlcnkuc2tpcCA9IHRoaXMucGFnZSAqIHRoaXMucXVlcnkubGltaXQ7XHJcbiAgICB0aGlzLnJlZnJlc2hHcmlkKCk7XHJcbiAgfVxyXG5cclxuICBzb3J0Q29sdW1uKGhlYWRlcjogR3JpZEhlYWRlcikge1xyXG4gICAgLy8gUmVzZXQgYWxsIG90aGVyIGNvbHVtbiBzb3J0cy5cclxuICAgIGVhY2godGhpcy5oZWFkZXIuaGVhZGVycywgKGNvbDogYW55KSA9PiB7XHJcbiAgICAgIGlmIChjb2wua2V5ICE9PSBoZWFkZXIua2V5KSB7XHJcbiAgICAgICAgY29sLnNvcnQgPSAnJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzd2l0Y2ggKGhlYWRlci5zb3J0KSB7XHJcbiAgICAgIGNhc2UgJ2FzYyc6XHJcbiAgICAgICAgaGVhZGVyLnNvcnQgPSBTb3J0VHlwZS5ERVNDO1xyXG4gICAgICAgIHRoaXMucXVlcnkuc29ydCA9ICctJyArIGhlYWRlci5rZXk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Rlc2MnOlxyXG4gICAgICAgIGhlYWRlci5zb3J0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5LnNvcnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxyXG4gICAgICAgIGhlYWRlci5zb3J0ID0gU29ydFR5cGUuQVNDO1xyXG4gICAgICAgIHRoaXMucXVlcnkuc29ydCA9IGhlYWRlci5rZXk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2hHcmlkKCk7XHJcbiAgfVxyXG5cclxuICBwYWdlQ2hhbmdlZChwYWdlOiBhbnkpIHtcclxuICAgIHRoaXMuc2V0UGFnZShwYWdlLnBhZ2UgLSAxKTtcclxuICB9XHJcbn1cclxuIiwiPG5nLXRlbXBsYXRlICNoZWFkZXJUZW1wbGF0ZT48L25nLXRlbXBsYXRlPlxyXG48bmctdGVtcGxhdGUgI2JvZHlUZW1wbGF0ZT48L25nLXRlbXBsYXRlPlxyXG48bmctdGVtcGxhdGUgI2Zvb3RlclRlbXBsYXRlPjwvbmctdGVtcGxhdGU+XHJcbjxkaXYgY2xhc3M9XCJmb3JtaW8tZ3JpZFwiPlxyXG4gIDxmb3JtaW8tYWxlcnRzIFthbGVydHNdPVwiYWxlcnRzXCI+PC9mb3JtaW8tYWxlcnRzPlxyXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLXN0cmlwZWQgdGFibGUtaG92ZXJcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbml0aWFsaXplZCAmJiBbZm9vdGVyUG9zaXRpb25zLnRvcCwgZm9vdGVyUG9zaXRpb25zLmJvdGhdLmluZGV4T2YoZm9vdGVyUG9zaXRpb24pICE9PSAtMVwiXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3Rlci50ZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IHBvc2l0aW9uOiBmb290ZXJQb3NpdGlvbnMudG9wLCBsYWJlbDogbGFiZWwgfVwiPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW5pdGlhbGl6ZWRcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJoZWFkZXIudGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuICAgIDxmb3JtaW8tbG9hZGVyIFtpc0xvYWRpbmddPVwiaXNMb2FkaW5nXCI+PC9mb3JtaW8tbG9hZGVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImluaXRpYWxpemVkXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiYm9keS50ZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImluaXRpYWxpemVkICYmIFtmb290ZXJQb3NpdGlvbnMuYm90dG9tLCBmb290ZXJQb3NpdGlvbnMuYm90aF0uaW5kZXhPZihmb290ZXJQb3NpdGlvbikgIT09IC0xXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiZm9vdGVyLnRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgcG9zaXRpb246IGZvb3RlclBvc2l0aW9ucy5ib3R0b20sIGxhYmVsOiBsYWJlbCB9XCI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L3RhYmxlPlxyXG48L2Rpdj5cclxuIl19