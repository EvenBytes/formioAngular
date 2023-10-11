import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Optional, Component, NgModule } from '@angular/core';
import * as i1 from '@formio/angular/auth';
import * as i1$1 from '@formio/angular';
import { FormioAlerts, FormioPromiseService, extendRouter, FormioModule } from '@formio/angular';
import { Formio, Utils } from '@formio/js';
import _, { each } from 'lodash';
import * as i2 from '@angular/router';
import { NavigationEnd, RouterModule } from '@angular/router';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@formio/angular/grid';
import { FormioGrid } from '@formio/angular/grid';

class FormioResourceConfig {
    name = '';
    form = '';
    parents = [];
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceConfig });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceConfig, decorators: [{
            type: Injectable
        }] });

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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResources, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });

class FormioResourceService {
    appConfig;
    config;
    resourcesService;
    initialized = false;
    form;
    alerts;
    resource;
    resourceUrl;
    formUrl;
    formFormio;
    formio;
    refresh;
    resourceResolve;
    resourceReject;
    resourceLoaded;
    resourceLoading;
    resourceId;
    resources;
    ready;
    readyResolve;
    readyReject;
    formLoading;
    formLoaded;
    formResolve;
    formReject;
    isLoading;
    constructor(appConfig, config, resourcesService) {
        this.appConfig = appConfig;
        this.config = config;
        this.resourcesService = resourcesService;
        this.isLoading = true;
        this.alerts = new FormioAlerts();
        this.refresh = new EventEmitter();
    }
    initialize() {
        console.warn('FormioResourceService.initialize() has been deprecated.');
    }
    setResource(resourceId) {
        this.resourceLoading = null;
        this.formLoading = null;
        this.ready = new Promise((resolve, reject) => {
            this.readyResolve = resolve;
            this.readyReject = reject;
        });
        this.formLoaded = new Promise((resolve, reject) => {
            this.formResolve = resolve;
            this.formReject = reject;
        });
        this.resourceLoaded = new Promise((resolve, reject) => {
            this.resourceResolve = resolve;
            this.resourceReject = reject;
        });
        this.resourceId = resourceId;
        this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
        if (this.resourceId) {
            this.resourceUrl += '/submission/' + this.resourceId;
        }
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
            Formio.formOnly = this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.formio = new FormioPromiseService(this.resourceUrl);
        this.resource = { data: {} };
    }
    init(route) {
        const resourceId = route.snapshot.params['id'];
        if (resourceId && (resourceId === this.resourceId)) {
            return this.ready;
        }
        // Set the resource.
        this.setResource(resourceId);
        // Add this resource service to the list of all resources in context.
        if (this.resourcesService) {
            this.resources = this.resourcesService.resources;
            this.resources[this.config.name] = this;
        }
        if (this.resourceId) {
            return this.loadForm()
                .then(() => this.loadResource())
                .then(() => this.readyResolve(this.form))
                .catch((err) => this.readyReject(err));
        }
        return this.loadForm()
            .then(() => this.readyResolve(this.form))
            .catch((err) => this.readyReject(err));
    }
    onError(error) {
        this.alerts.setAlert({
            type: 'danger',
            message: error.message || error
        });
        if (this.resourcesService) {
            this.resourcesService.error.emit(error);
        }
        throw error;
    }
    onFormError(err) {
        this.formReject(err);
        this.onError(err);
    }
    loadForm() {
        if (this.formLoading) {
            return this.formLoading;
        }
        this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.formFormio = new FormioPromiseService(this.formUrl);
        this.isLoading = true;
        this.formLoading = this.formFormio
            .loadForm()
            .then((form) => {
            this.form = form;
            this.formResolve(form);
            this.isLoading = false;
            this.loadParents();
            return form;
        }, (err) => this.onFormError(err))
            .catch((err) => this.onFormError(err));
        return this.formLoading;
    }
    loadParents() {
        if (!this.config.parents || !this.config.parents.length) {
            return Promise.resolve([]);
        }
        if (!this.resourcesService) {
            console.warn('You must provide the FormioResources within your application to use nested resources.');
            return Promise.resolve([]);
        }
        return this.formLoading.then((form) => {
            // Iterate through the list of parents.
            const _parentsLoaded = [];
            this.config.parents.forEach((parent) => {
                const resourceName = parent.resource || parent;
                const resourceField = parent.field || parent;
                const filterResource = parent.hasOwnProperty('filter') ? parent.filter : true;
                if (this.resources.hasOwnProperty(resourceName) && this.resources[resourceName].resourceLoaded) {
                    _parentsLoaded.push(this.resources[resourceName].resourceLoaded.then((resource) => {
                        let parentPath = '';
                        Utils.eachComponent(form.components, (component, path) => {
                            if (component.key === resourceField) {
                                component.hidden = true;
                                component.clearOnHide = false;
                                _.set(this.resource.data, path, resource);
                                parentPath = path;
                                return true;
                            }
                        });
                        return {
                            name: parentPath,
                            filter: filterResource,
                            resource
                        };
                    }));
                }
            });
            // When all the parents have loaded, emit that to the onParents emitter.
            return Promise.all(_parentsLoaded).then((parents) => {
                this.refresh.emit({
                    form: form,
                    submission: this.resource
                });
                return parents;
            });
        });
    }
    onSubmissionError(err) {
        this.onError(err);
        this.resourceReject(err);
    }
    loadResource() {
        if (this.resourceLoading) {
            return this.resourceLoading;
        }
        this.isLoading = true;
        this.resourceLoading = this.formio
            .loadSubmission(null, { ignoreCache: true })
            .then((resource) => {
            this.resource = resource;
            this.isLoading = false;
            this.refresh.emit({
                property: 'submission',
                value: this.resource
            });
            this.resourceResolve(resource);
            return resource;
        }, (err) => this.onSubmissionError(err))
            .catch((err) => this.onSubmissionError(err));
        return this.resourceLoading;
    }
    save(resource) {
        const formio = resource._id ? this.formio : this.formFormio;
        return formio
            .saveSubmission(resource)
            .then((saved) => {
            this.resource = saved;
            return saved;
        }, (err) => this.onError(err))
            .catch((err) => this.onError(err));
    }
    remove() {
        return this.formio
            .deleteSubmission()
            .then(() => {
            this.resource = null;
        }, (err) => this.onError(err))
            .catch((err) => this.onError(err));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceService, deps: [{ token: i1$1.FormioAppConfig }, { token: FormioResourceConfig }, { token: FormioResources, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.FormioAppConfig }, { type: FormioResourceConfig }, { type: FormioResources, decorators: [{
                    type: Optional
                }] }]; } });

class FormioResourceComponent {
    service;
    route;
    auth;
    router;
    perms = { delete: false, edit: false };
    routerSubscription;
    constructor(service, route, auth, router) {
        this.service = service;
        this.route = route;
        this.auth = auth;
        this.router = router;
    }
    ngOnInit() {
        this.init();
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.init();
            }
        });
    }
    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
    init() {
        return this.service.init(this.route).then(() => this.auth.ready.then(() => this.service.formFormio.userPermissions(this.auth.user, this.service.form, this.service.resource).then((perms) => {
            this.perms.delete = perms.delete;
            this.perms.edit = perms.edit;
            return this.service.resource;
        })));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i1.FormioAuthService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceComponent, selector: "ng-component", ngImport: i0, template: "<ul class=\"nav nav-tabs\" style=\"margin-bottom: 10px\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left bi bi-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\">View</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\">Edit</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash bi bi-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceComponent, decorators: [{
            type: Component,
            args: [{ template: "<ul class=\"nav nav-tabs\" style=\"margin-bottom: 10px\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left bi bi-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\">View</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\">Edit</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash bi bi-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i1.FormioAuthService }, { type: i2.Router }]; } });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceViewComponent, deps: [{ token: FormioResourceService }, { token: FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceViewComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i1$1.FormioComponent, selector: "formio" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: FormioResourceConfig }]; } });

class FormioResourceEditComponent {
    service;
    route;
    router;
    config;
    triggerError = new EventEmitter();
    onSubmitDone = new EventEmitter();
    submission = { data: {} };
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
    }
    onSubmit(submission) {
        const edit = this.service.resource;
        edit.data = submission.data;
        this.service.save(edit)
            .then(() => {
            this.onSubmitDone.emit(this.service.resource);
            this.router.navigate(['../', 'view'], { relativeTo: this.route });
        })
            .catch((err) => this.triggerError.emit(err));
    }
    ngOnDestroy() {
        Formio.clearCache();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceEditComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceEditComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  [submitDone]=\"onSubmitDone\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i1$1.FormioComponent, selector: "formio" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  [submitDone]=\"onSubmitDone\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: FormioResourceConfig }]; } });

class FormioResourceDeleteComponent {
    service;
    route;
    router;
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    onDelete() {
        this.service.remove().then(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
    onCancel() {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceDeleteComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceDeleteComponent, selector: "ng-component", ngImport: i0, template: "<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button>\r\n</div>\r\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceDeleteComponent, decorators: [{
            type: Component,
            args: [{ template: "<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }]; } });

class FormioResourceCreateComponent {
    service;
    route;
    router;
    config;
    onError;
    onSuccess;
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.onError = new EventEmitter();
        this.onSuccess = new EventEmitter();
    }
    ngOnInit() {
        this.service.init(this.route);
    }
    onSubmit(submission) {
        this.service
            .save(submission)
            .then(() => {
            this.router.navigate(['../', this.service.resource._id, 'view'], {
                relativeTo: this.route
            });
        })
            .catch((err) => this.onError.emit(err));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceCreateComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceCreateComponent, selector: "ng-component", ngImport: i0, template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left bi bi-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1$1.FormioComponent, selector: "formio" }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceCreateComponent, decorators: [{
            type: Component,
            args: [{ template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left bi bi-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"] }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: FormioResourceConfig }]; } });

class FormioResourceIndexComponent {
    service;
    route;
    router;
    config;
    cdr;
    ngZone;
    gridSrc;
    gridQuery;
    createText;
    constructor(service, route, router, config, cdr, ngZone) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.cdr = cdr;
        this.ngZone = ngZone;
    }
    ngOnInit() {
        this.service.init(this.route).then(() => {
            this.gridQuery = {};
            if (this.service &&
                this.config.parents &&
                this.config.parents.length) {
                this.service.loadParents().then((parents) => {
                    each(parents, (parent) => {
                        if (parent && parent.filter) {
                            this.gridQuery['data.' + parent.name + '._id'] =
                                parent.resource._id;
                        }
                    });
                    // Set the source to load the grid.
                    this.gridSrc = this.service.formUrl;
                    this.createText = `New ${this.service.form.title}`;
                    this.cdr.detectChanges();
                });
            }
            else if (this.service.formUrl) {
                this.gridSrc = this.service.formUrl;
                this.createText = `New ${this.service.form.title}`;
            }
        });
    }
    onSelect(row) {
        this.ngZone.run(() => {
            this.router.navigate([row._id, 'view'], { relativeTo: this.route });
        });
    }
    onCreateItem() {
        this.ngZone.run(() => {
            this.router.navigate(['new'], { relativeTo: this.route });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceIndexComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: FormioResourceConfig }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioResourceIndexComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n", dependencies: [{ kind: "component", type: i1$1.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "component", type: i5.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: FormioResourceConfig }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; } });

function FormioResourceRoutes(config) {
    return [
        {
            path: '',
            component: config && config.index ? config.index : FormioResourceIndexComponent
        },
        {
            path: 'new',
            component: config && config.create ? config.create : FormioResourceCreateComponent
        },
        {
            path: ':id',
            component: config && config.resource ? config.resource : FormioResourceComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config && config.view ? config.view : FormioResourceViewComponent
                },
                {
                    path: 'edit',
                    component: config && config.edit ? config.edit : FormioResourceEditComponent
                },
                {
                    path: 'delete',
                    component: config && config.delete ? config.delete : FormioResourceDeleteComponent
                }
            ]
        }
    ];
}

class FormioResource {
    static forChild(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
    static forRoot(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, declarations: [FormioResourceComponent,
            FormioResourceCreateComponent,
            FormioResourceIndexComponent,
            FormioResourceViewComponent,
            FormioResourceEditComponent,
            FormioResourceDeleteComponent], imports: [CommonModule,
            FormioModule,
            FormioGrid,
            RouterModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, providers: [
            FormioAlerts
        ], imports: [CommonModule,
            FormioModule,
            FormioGrid,
            RouterModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        FormioGrid,
                        RouterModule
                    ],
                    declarations: [
                        FormioResourceComponent,
                        FormioResourceCreateComponent,
                        FormioResourceIndexComponent,
                        FormioResourceViewComponent,
                        FormioResourceEditComponent,
                        FormioResourceDeleteComponent
                    ],
                    providers: [
                        FormioAlerts
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormioResource, FormioResourceComponent, FormioResourceConfig, FormioResourceCreateComponent, FormioResourceDeleteComponent, FormioResourceEditComponent, FormioResourceIndexComponent, FormioResourceRoutes, FormioResourceService, FormioResourceViewComponent, FormioResources };
//# sourceMappingURL=formio-angular-resource.mjs.map
