import * as i0 from '@angular/core';
import { EventEmitter, TemplateRef, Component, Input, Output, ViewChild, Injectable, Pipe, ViewChildren, ViewEncapsulation, ViewContainerRef, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$1 from '@formio/angular';
import { FormioPromiseService, FormioModule, FormioAlerts } from '@formio/angular';
import { each, clone, get } from 'lodash';
import { Components, Utils, Formio } from '@formio/js';
import { Tooltip } from 'bootstrap';
import * as i3 from 'ngx-bootstrap/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';

var GridFooterPositions;
(function (GridFooterPositions) {
    GridFooterPositions[GridFooterPositions["bottom"] = 0] = "bottom";
    GridFooterPositions[GridFooterPositions["top"] = 1] = "top";
    GridFooterPositions[GridFooterPositions["both"] = 2] = "both";
})(GridFooterPositions || (GridFooterPositions = {}));

class GridHeaderComponent {
    actionAllowed;
    sort;
    template;
    headers;
    constructor() {
        this.headers = [];
        this.sort = new EventEmitter();
    }
    get numHeaders() {
        return this.headers.length;
    }
    load(formio, query, columns) {
        return Promise.resolve([]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GridHeaderComponent, selector: "ng-component", inputs: { actionAllowed: "actionAllowed" }, outputs: { sort: "sort" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { actionAllowed: [{
                type: Input
            }], sort: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

var SortType;
(function (SortType) {
    SortType["ASC"] = "asc";
    SortType["DESC"] = "desc";
})(SortType || (SortType = {}));

class FormGridHeaderComponent extends GridHeaderComponent {
    header;
    load(formio) {
        this.header = {
            label: 'Title',
            key: 'title',
            sort: SortType.ASC
        };
        this.headers = [this.header];
        return Promise.resolve(this.headers);
    }
    get numHeaders() {
        return 2;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridHeaderComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormGridHeaderComponent, selector: "form-grid-header", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-9\">\r\n            <a (click)=\"sort.emit(header)\" style=\"cursor: pointer\">\r\n              {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n            </a>\r\n          </div>\r\n          <div class=\"col-sm-3 d-flex justify-content-end\">\r\n            Operations\r\n          </div>\r\n        </div>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-grid-header', template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-9\">\r\n            <a (click)=\"sort.emit(header)\" style=\"cursor: pointer\">\r\n              {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n            </a>\r\n          </div>\r\n          <div class=\"col-sm-3 d-flex justify-content-end\">\r\n            Operations\r\n          </div>\r\n        </div>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n" }]
        }] });

class GridService {
    rows;
    constructor() { }
    setRows(rows) {
        this.rows = rows;
    }
    getFormsPerPage() {
        return this.rows?.length;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class GridBodyComponent {
    service;
    header;
    actionAllowed;
    rowSelect;
    rowAction;
    template;
    rows;
    loading;
    firstItem = 0;
    lastItem = 0;
    skip = 0;
    limit = 0;
    total = 0;
    constructor(service) {
        this.service = service;
        this.rowSelect = new EventEmitter();
        this.rowAction = new EventEmitter();
        this.loading = true;
    }
    load(formio, query) {
        return formio.loadForm(query);
    }
    onRowSelect(event, row) {
        event.preventDefault();
        this.rowSelect.emit(row);
    }
    onRowAction(event, row, action) {
        event.preventDefault();
        this.rowAction.emit({ row, action });
    }
    /**
     * Set the rows for this Grid body.
     *
     * @param query
     * @param items
     * @return any
     */
    setRows(query, items) {
        this.rows = [];
        if (typeof items !== 'object') {
            this.firstItem = 0;
            this.lastItem = 0;
            this.total = 0;
            this.skip = 0;
            this.loading = false;
            this.service.setRows(this.rows);
            return this.rows;
        }
        this.firstItem = query.skip + 1;
        this.lastItem = this.firstItem + items.length - 1;
        if (this.lastItem === 0) {
            this.firstItem = 0;
        }
        this.total = items.serverCount;
        this.limit = query.limit;
        this.skip = Math.floor(items.skip / query.limit) + 1;
        this.loading = false;
        each(items, (item) => {
            this.rows.push(clone(item));
        });
        this.service.setRows(this.rows);
        return this.rows;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridBodyComponent, deps: [{ token: GridService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GridBodyComponent, selector: "ng-component", inputs: { header: "header", actionAllowed: "actionAllowed" }, outputs: { rowSelect: "rowSelect", rowAction: "rowAction" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridBodyComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: GridService }]; }, propDecorators: { header: [{
                type: Input
            }], actionAllowed: [{
                type: Input
            }], rowSelect: [{
                type: Output
            }], rowAction: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

class TimeSince {
    transform(date) {
        const elapsed = (new Date().getTime() - new Date(date).getTime()) / 1000;
        let interval;
        if (interval >= 1) {
            return interval + ' year' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 2592000);
        if (interval >= 1) {
            return interval + ' month' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 86400);
        if (interval >= 1) {
            return interval + ' day' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 3600);
        if (interval >= 1) {
            return interval + ' hour' + (interval > 1 ? 's' : '');
        }
        interval = Math.floor(elapsed / 60);
        if (interval >= 1) {
            return interval + ' minute' + (interval > 1 ? 's' : '');
        }
        return Math.floor(elapsed) + ' second' + (elapsed > 1 ? 's' : '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: TimeSince, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: TimeSince, name: "timeSince" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: TimeSince, decorators: [{
            type: Pipe,
            args: [{
                    name: 'timeSince'
                }]
        }] });

class FormGridBodyComponent extends GridBodyComponent {
    createBtns;
    viewBtns;
    editBtns;
    permissionsBtns;
    deleteBtns;
    tooltips = [];
    load(formio, query) {
        query = query || {};
        return formio.loadForms({ params: query })
            .then((forms) => this.setRows(query, forms))
            .then(() => this.attachTooltips());
    }
    attachTooltips() {
        this.createBtns.forEach((el) => {
            this.tooltips.push(new Tooltip(el.nativeElement, { title: 'Create' }));
        });
        this.editBtns.forEach((el) => {
            this.tooltips.push(new Tooltip(el.nativeElement, { title: 'Edit' }));
        });
        this.viewBtns.forEach((el) => {
            this.tooltips.push(new Tooltip(el.nativeElement, { title: 'View' }));
        });
        this.permissionsBtns.forEach((el) => {
            this.tooltips.push(new Tooltip(el.nativeElement, { title: 'Permissions' }));
        });
        this.deleteBtns.forEach((el) => {
            this.tooltips.push(new Tooltip(el.nativeElement, { title: 'Delete' }));
        });
    }
    ngOnDestroy() {
        this.tooltips.forEach((tootip) => tootip.dispose());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridBodyComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormGridBodyComponent, selector: "form-grid-body", viewQueries: [{ propertyName: "createBtns", predicate: ["create"], descendants: true }, { propertyName: "viewBtns", predicate: ["view"], descendants: true }, { propertyName: "editBtns", predicate: ["edit"], descendants: true }, { propertyName: "permissionsBtns", predicate: ["permissions"], descendants: true }, { propertyName: "deleteBtns", predicate: ["delete"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <tbody *ngIf=\"rows\">\r\n    <tr *ngFor=\"let form of rows\">\r\n      <td>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-9\">\r\n            <a routerLink=\"{{form._id}}/view\" (click)=\"onRowSelect($event, form)\" class=\"text-decoration-none\"><h5>{{ form.title }}</h5></a>\r\n            <div class=\"form-updated small text-muted\">\r\n              Updated {{ form.modified | timeSince }} ago\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-3 d-flex justify-content-end align-items-center\">\r\n            <button #create *ngIf=\"actionAllowed('formView')\" class=\"btn btn-outline-secondary btn-sm form-btn form-btn-use\" (click)=\"onRowAction($event, form, 'view')\"><span class=\"fa fa-pencil bi bi-pencil\"></span></button>&nbsp;\r\n            <button #view *ngIf=\"actionAllowed('formSubmission')\" class=\"btn btn-outline-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'submission')\"><span class=\"fa fa-list-alt bi bi-table\"></span></button>&nbsp;\r\n            <button #edit *ngIf=\"actionAllowed('formEdit')\" class=\"btn btn-outline-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'edit')\"><span class=\"fa fa-edit bi bi-pencil-square\"></span></button>&nbsp;\r\n            <button #delete *ngIf=\"actionAllowed('formDelete')\" class=\"btn btn-secondary btn-sm form-btn form-btn-delete\" (click)=\"onRowAction($event, form, 'delete')\" title=\"Delete form\"><span class=\"fa fa-trash bi bi-trash\"></span></button>\r\n          </div>\r\n        </div>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n", styles: [".form-btn{font-size:.75rem;margin:2px 0}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: TimeSince, name: "timeSince" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridBodyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-grid-body', template: "<ng-template>\r\n  <tbody *ngIf=\"rows\">\r\n    <tr *ngFor=\"let form of rows\">\r\n      <td>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-9\">\r\n            <a routerLink=\"{{form._id}}/view\" (click)=\"onRowSelect($event, form)\" class=\"text-decoration-none\"><h5>{{ form.title }}</h5></a>\r\n            <div class=\"form-updated small text-muted\">\r\n              Updated {{ form.modified | timeSince }} ago\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-3 d-flex justify-content-end align-items-center\">\r\n            <button #create *ngIf=\"actionAllowed('formView')\" class=\"btn btn-outline-secondary btn-sm form-btn form-btn-use\" (click)=\"onRowAction($event, form, 'view')\"><span class=\"fa fa-pencil bi bi-pencil\"></span></button>&nbsp;\r\n            <button #view *ngIf=\"actionAllowed('formSubmission')\" class=\"btn btn-outline-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'submission')\"><span class=\"fa fa-list-alt bi bi-table\"></span></button>&nbsp;\r\n            <button #edit *ngIf=\"actionAllowed('formEdit')\" class=\"btn btn-outline-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'edit')\"><span class=\"fa fa-edit bi bi-pencil-square\"></span></button>&nbsp;\r\n            <button #delete *ngIf=\"actionAllowed('formDelete')\" class=\"btn btn-secondary btn-sm form-btn form-btn-delete\" (click)=\"onRowAction($event, form, 'delete')\" title=\"Delete form\"><span class=\"fa fa-trash bi bi-trash\"></span></button>\r\n          </div>\r\n        </div>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n", styles: [".form-btn{font-size:.75rem;margin:2px 0}\n"] }]
        }], propDecorators: { createBtns: [{
                type: ViewChildren,
                args: ['create']
            }], viewBtns: [{
                type: ViewChildren,
                args: ['view']
            }], editBtns: [{
                type: ViewChildren,
                args: ['edit']
            }], permissionsBtns: [{
                type: ViewChildren,
                args: ['permissions']
            }], deleteBtns: [{
                type: ViewChildren,
                args: ['delete']
            }] } });

class GridFooterComponent {
    header;
    body;
    createText;
    size;
    actionAllowed;
    pageChanged;
    createItem;
    template;
    footerPositions = GridFooterPositions;
    constructor() {
        this.pageChanged = new EventEmitter();
        this.createItem = new EventEmitter();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GridFooterComponent, selector: "ng-component", inputs: { header: "header", body: "body", createText: "createText", size: "size", actionAllowed: "actionAllowed" }, outputs: { pageChanged: "pageChanged", createItem: "createItem" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridFooterComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { header: [{
                type: Input
            }], body: [{
                type: Input
            }], createText: [{
                type: Input
            }], size: [{
                type: Input
            }], actionAllowed: [{
                type: Input
            }], pageChanged: [{
                type: Output
            }], createItem: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

class FormGridFooterComponent extends GridFooterComponent {
    constructor() {
        super();
    }
    ngOnInit() {
        if (!this.createText) {
            this.createText = 'Create Form';
        }
        if (!this.size) {
            this.size = 7;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormGridFooterComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template #footer let-position=\"position\" let-label=\"label\">\r\n  <thead class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.top\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\" [ngTemplateOutletContext]=\"{ label: label }\"></ng-container>\r\n  </thead>\r\n  <tfoot class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.bottom\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\" [ngTemplateOutletContext]=\"{ label: label }\"></ng-container>\r\n  </tfoot>\r\n</ng-template>\r\n\r\n<ng-template let-label=\"label\" #defaultFooterTemplate>\r\n  <tr>\r\n    <td *ngIf=\"header\" [colSpan]=\"header.numHeaders\">\r\n      <button *ngIf=\"actionAllowed('formCreate')\" class=\"btn btn-primary form-btn-use float-start\" (click)=\"createItem.emit('form')\"><em class=\"fa fa-plus bi bi-plus-lg\"></em> {{ createText }}</button>\r\n      <span class=\"float-end item-counter\"><span class=\"page-num\">{{ body.firstItem }} - {{ body.lastItem }}</span> / {{ body.total }} total</span>\r\n      <span [attr.aria-label]=\"label\" role=\"navigation\">\r\n        <pagination [totalItems]=\"body.total\" [itemsPerPage]=\"body.limit\" [(ngModel)]=\"body.skip\" (pageChanged)=\"pageChanged.emit($event)\" [maxSize]=\"size\" class=\"justify-content-center pagination-sm\">\r\n        </pagination>\r\n      </span>\r\n    </td>\r\n  </tr>\r\n</ng-template>\r\n", styles: ["tfoot.formio-grid-footer td{padding:.3rem}tfoot.formio-grid-footer .page-num{font-size:1.4em}tfoot.formio-grid-footer ul.pagination{margin-top:5px;margin-bottom:0}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.PaginationComponent, selector: "pagination", inputs: ["align", "maxSize", "boundaryLinks", "directionLinks", "firstText", "previousText", "nextText", "lastText", "rotate", "pageBtnClass", "disabled", "customPageTemplate", "customNextTemplate", "customPreviousTemplate", "customFirstTemplate", "customLastTemplate", "itemsPerPage", "totalItems"], outputs: ["numPages", "pageChanged"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridFooterComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, template: "<ng-template #footer let-position=\"position\" let-label=\"label\">\r\n  <thead class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.top\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\" [ngTemplateOutletContext]=\"{ label: label }\"></ng-container>\r\n  </thead>\r\n  <tfoot class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.bottom\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\" [ngTemplateOutletContext]=\"{ label: label }\"></ng-container>\r\n  </tfoot>\r\n</ng-template>\r\n\r\n<ng-template let-label=\"label\" #defaultFooterTemplate>\r\n  <tr>\r\n    <td *ngIf=\"header\" [colSpan]=\"header.numHeaders\">\r\n      <button *ngIf=\"actionAllowed('formCreate')\" class=\"btn btn-primary form-btn-use float-start\" (click)=\"createItem.emit('form')\"><em class=\"fa fa-plus bi bi-plus-lg\"></em> {{ createText }}</button>\r\n      <span class=\"float-end item-counter\"><span class=\"page-num\">{{ body.firstItem }} - {{ body.lastItem }}</span> / {{ body.total }} total</span>\r\n      <span [attr.aria-label]=\"label\" role=\"navigation\">\r\n        <pagination [totalItems]=\"body.total\" [itemsPerPage]=\"body.limit\" [(ngModel)]=\"body.skip\" (pageChanged)=\"pageChanged.emit($event)\" [maxSize]=\"size\" class=\"justify-content-center pagination-sm\">\r\n        </pagination>\r\n      </span>\r\n    </td>\r\n  </tr>\r\n</ng-template>\r\n", styles: ["tfoot.formio-grid-footer td{padding:.3rem}tfoot.formio-grid-footer .page-num{font-size:1.4em}tfoot.formio-grid-footer ul.pagination{margin-top:5px;margin-bottom:0}\n"] }]
        }], ctorParameters: function () { return []; } });

var FormComponents = {
    header: FormGridHeaderComponent,
    body: FormGridBodyComponent,
    footer: FormGridFooterComponent
};

class SubmissionGridHeaderComponent extends GridHeaderComponent {
    // Map structure where the key is the path and the value is the component
    formComponents;
    load(formio, query, columns) {
        query = query || {};
        return formio.loadForm({ params: query }).then((form) => {
            this.headers = [];
            this.formComponents = new Map();
            this.setComponents(form.components);
            columns ? columns.forEach(column => {
                this.setHeader(this.getHeaderForColumn(column, this.formComponents.get(column.path)));
            }) : this.setComponentsHeaders(this.formComponents);
            return this.headers;
        });
    }
    setHeader(header) {
        this.headers.push(header);
    }
    getHeaderForColumn(column, component, sort) {
        return {
            label: column.label,
            key: column.path,
            sort: sort,
            component: component ? Components.create(component, null, null, true) : undefined,
            renderCell: column ? column.renderCell : undefined
        };
    }
    getHeaderForComponent(component, path, sort) {
        return {
            label: component.label,
            key: path,
            sort: sort,
            component: component ? Components.create(component, null, null, true) : undefined,
        };
    }
    // Set headers from components in case if columns are not provided
    setComponentsHeaders(components, sort) {
        components.forEach((component, path) => {
            if (component.input &&
                (!component.hasOwnProperty('tableView') || component.tableView)) {
                this.setHeader(this.getHeaderForComponent(component, path, sort));
            }
        });
    }
    // Map components
    setComponents(components) {
        Utils.eachComponent(components, (component, newPath) => {
            this.formComponents.set(`data.${newPath}`, component);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridHeaderComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionGridHeaderComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let header of headers\">\r\n        <a (click)=\"sort.emit(header)\">\r\n          {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n        </a>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridHeaderComponent, decorators: [{
            type: Component,
            args: [{ template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let header of headers\">\r\n        <a (click)=\"sort.emit(header)\">\r\n          {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n        </a>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n" }]
        }] });

class SubmissionGridBodyComponent extends GridBodyComponent {
    load(formio, query) {
        query = query || {};
        return formio.loadSubmissions({ params: query })
            .then((submissions) => this.setRows(query, submissions));
    }
    /**
     * Render the cell data.
     *
     * @param submission
     * @param header
     * @return any
     */
    view(submission, header) {
        const cellValue = get(submission, header.key);
        if (header.renderCell) {
            return header.renderCell(cellValue, header.component);
        }
        else {
            if (header.component) {
                if (header.component.getView) {
                    return header.component.getView(cellValue);
                }
                return header.component.asString(cellValue);
            }
            else {
                return cellValue.toString();
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridBodyComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionGridBodyComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <tbody>\r\n    <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\">\r\n      <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridBodyComponent, decorators: [{
            type: Component,
            args: [{ template: "<ng-template>\r\n  <tbody>\r\n    <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\">\r\n      <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n" }]
        }] });

class SubmissionGridFooterComponent extends GridFooterComponent {
    constructor() {
        super();
    }
    ngOnInit() {
        if (!this.size) {
            this.size = 7;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionGridFooterComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template #footer let-position=\"position\">\r\n  <thead class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.top\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\"></ng-container>\r\n  </thead>\r\n  <tfoot class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.bottom\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\"></ng-container>\r\n  </tfoot>\r\n</ng-template>\r\n\r\n<ng-template #defaultFooterTemplate>\r\n  <tr>\r\n    <td *ngIf=\"header\" [colSpan]=\"header.numHeaders\">\r\n      <button *ngIf=\"actionAllowed('submissionCreate') && createText\" class=\"btn btn-primary float-start\" (click)=\"createItem.emit('form')\"><em class=\"fa fa-plus bi bi-plus\"></em> {{ createText }}</button>\r\n      <span class=\"float-end item-counter\"><span class=\"page-num\">{{ body.firstItem }} - {{ body.lastItem }}</span> / {{ body.total }} total</span>\r\n      <pagination [totalItems]=\"body.total\" [itemsPerPage]=\"body.limit\" [(ngModel)]=\"body.skip\" (pageChanged)=\"pageChanged.emit($event)\" [maxSize]=\"size\" class=\"justify-content-center pagination-sm\"></pagination>\r\n    </td>\r\n  </tr>\r\n</ng-template>\r\n", styles: ["tfoot.formio-grid-footer td{padding:.3rem}tfoot.formio-grid-footer .page-num{font-size:1.4em}tfoot.formio-grid-footer ul.pagination{margin-top:5px;margin-bottom:0}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.PaginationComponent, selector: "pagination", inputs: ["align", "maxSize", "boundaryLinks", "directionLinks", "firstText", "previousText", "nextText", "lastText", "rotate", "pageBtnClass", "disabled", "customPageTemplate", "customNextTemplate", "customPreviousTemplate", "customFirstTemplate", "customLastTemplate", "itemsPerPage", "totalItems"], outputs: ["numPages", "pageChanged"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridFooterComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, template: "<ng-template #footer let-position=\"position\">\r\n  <thead class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.top\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\"></ng-container>\r\n  </thead>\r\n  <tfoot class=\"formio-grid-footer\" *ngIf=\"position === footerPositions.bottom\">\r\n    <ng-container [ngTemplateOutlet]=\"defaultFooterTemplate\"></ng-container>\r\n  </tfoot>\r\n</ng-template>\r\n\r\n<ng-template #defaultFooterTemplate>\r\n  <tr>\r\n    <td *ngIf=\"header\" [colSpan]=\"header.numHeaders\">\r\n      <button *ngIf=\"actionAllowed('submissionCreate') && createText\" class=\"btn btn-primary float-start\" (click)=\"createItem.emit('form')\"><em class=\"fa fa-plus bi bi-plus\"></em> {{ createText }}</button>\r\n      <span class=\"float-end item-counter\"><span class=\"page-num\">{{ body.firstItem }} - {{ body.lastItem }}</span> / {{ body.total }} total</span>\r\n      <pagination [totalItems]=\"body.total\" [itemsPerPage]=\"body.limit\" [(ngModel)]=\"body.skip\" (pageChanged)=\"pageChanged.emit($event)\" [maxSize]=\"size\" class=\"justify-content-center pagination-sm\"></pagination>\r\n    </td>\r\n  </tr>\r\n</ng-template>\r\n", styles: ["tfoot.formio-grid-footer td{padding:.3rem}tfoot.formio-grid-footer .page-num{font-size:1.4em}tfoot.formio-grid-footer ul.pagination{margin-top:5px;margin-bottom:0}\n"] }]
        }], ctorParameters: function () { return []; } });

var SubmissionComponents = {
    header: SubmissionGridHeaderComponent,
    body: SubmissionGridBodyComponent,
    footer: SubmissionGridFooterComponent
};

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGridComponent, deps: [{ token: i1$1.FormioAlerts }, { token: i0.ComponentFactoryResolver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioGridComponent, selector: "formio-grid", inputs: { footerPosition: "footerPosition", src: "src", items: "items", onForm: "onForm", query: "query", refresh: "refresh", columns: "columns", gridType: "gridType", size: "size", components: "components", formio: "formio", label: "label", createText: "createText", isActionAllowed: "isActionAllowed" }, outputs: { select: "select", rowSelect: "rowSelect", rowAction: "rowAction", createItem: "createItem", error: "error" }, viewQueries: [{ propertyName: "headerElement", first: true, predicate: ["headerTemplate"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "bodyElement", first: true, predicate: ["bodyTemplate"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "footerElement", first: true, predicate: ["footerTemplate"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template #headerTemplate></ng-template>\r\n<ng-template #bodyTemplate></ng-template>\r\n<ng-template #footerTemplate></ng-template>\r\n<div class=\"formio-grid\">\r\n  <formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n  <table class=\"table table-bordered table-striped table-hover\">\r\n    <ng-container *ngIf=\"initialized && [footerPositions.top, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.top, label: label }\">\r\n    </ng-container>\r\n    <ng-container *ngIf=\"initialized\"\r\n      [ngTemplateOutlet]=\"header.template\"></ng-container>\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n    <ng-container *ngIf=\"initialized\" [ngTemplateOutlet]=\"body.template\"></ng-container>\r\n    <ng-container *ngIf=\"initialized && [footerPositions.bottom, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.bottom, label: label }\">\r\n    </ng-container>\r\n  </table>\r\n</div>\r\n", styles: [".formio-grid{position:relative;width:100%}.grid-refresh{height:400px;width:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i1$1.FormioLoaderComponent, selector: "formio-loader", inputs: ["isLoading"] }, { kind: "component", type: i1$1.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio-grid', template: "<ng-template #headerTemplate></ng-template>\r\n<ng-template #bodyTemplate></ng-template>\r\n<ng-template #footerTemplate></ng-template>\r\n<div class=\"formio-grid\">\r\n  <formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n  <table class=\"table table-bordered table-striped table-hover\">\r\n    <ng-container *ngIf=\"initialized && [footerPositions.top, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.top, label: label }\">\r\n    </ng-container>\r\n    <ng-container *ngIf=\"initialized\"\r\n      [ngTemplateOutlet]=\"header.template\"></ng-container>\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n    <ng-container *ngIf=\"initialized\" [ngTemplateOutlet]=\"body.template\"></ng-container>\r\n    <ng-container *ngIf=\"initialized && [footerPositions.bottom, footerPositions.both].indexOf(footerPosition) !== -1\"\r\n      [ngTemplateOutlet]=\"footer.template\" [ngTemplateOutletContext]=\"{ position: footerPositions.bottom, label: label }\">\r\n    </ng-container>\r\n  </table>\r\n</div>\r\n", styles: [".formio-grid{position:relative;width:100%}.grid-refresh{height:400px;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.FormioAlerts }, { type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerPosition: [{
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

class FormioGrid {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, declarations: [FormioGridComponent,
            FormGridHeaderComponent,
            FormGridBodyComponent,
            FormGridFooterComponent,
            SubmissionGridHeaderComponent,
            SubmissionGridBodyComponent,
            SubmissionGridFooterComponent,
            GridHeaderComponent,
            GridBodyComponent,
            GridFooterComponent,
            TimeSince], imports: [CommonModule,
            FormsModule,
            FormioModule,
            RouterModule, i3.PaginationModule], exports: [FormioGridComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, providers: [
            FormioAlerts,
            GridService
        ], imports: [CommonModule,
            FormsModule,
            FormioModule,
            RouterModule,
            PaginationModule.forRoot()] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        FormioModule,
                        RouterModule,
                        PaginationModule.forRoot()
                    ],
                    declarations: [
                        FormioGridComponent,
                        FormGridHeaderComponent,
                        FormGridBodyComponent,
                        FormGridFooterComponent,
                        SubmissionGridHeaderComponent,
                        SubmissionGridBodyComponent,
                        SubmissionGridFooterComponent,
                        GridHeaderComponent,
                        GridBodyComponent,
                        GridFooterComponent,
                        TimeSince
                    ],
                    exports: [
                        FormioGridComponent
                    ],
                    providers: [
                        FormioAlerts,
                        GridService
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormGridBodyComponent, FormGridFooterComponent, FormGridHeaderComponent, FormioGrid, FormioGridComponent, GridBodyComponent, GridFooterComponent, GridHeaderComponent, GridService, SubmissionGridBodyComponent, SubmissionGridFooterComponent, SubmissionGridHeaderComponent };
//# sourceMappingURL=formio-angular-grid.mjs.map
