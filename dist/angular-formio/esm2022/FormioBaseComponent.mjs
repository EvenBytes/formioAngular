import { Component, EventEmitter, Input, Optional, Output, ViewChild } from '@angular/core';
import { FormioService } from './formio.service';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { assign, get, isEmpty } from 'lodash';
import { Utils } from '@formio/js';
import { AlertsPosition } from './types/alerts-position';
import * as i0 from "@angular/core";
import * as i1 from "./formio.config";
import * as i2 from "./custom-component/custom-tags.service";
const { Evaluator, fastCloneDeep } = Utils;
class FormioBaseComponent {
    ngZone;
    config;
    customTags;
    form;
    submission = {};
    src;
    url;
    service;
    options;
    noeval = Evaluator.noeval;
    formioOptions;
    renderOptions;
    readOnly = false;
    viewOnly = false;
    hideLoading = false;
    hideComponents;
    refresh;
    error;
    success;
    submitDone;
    language;
    hooks = {};
    renderer;
    watchSubmissionErrors = false;
    dataTableActions = [];
    render = new EventEmitter();
    customEvent = new EventEmitter();
    fileUploadingStatus = new EventEmitter();
    submit = new EventEmitter();
    prevPage = new EventEmitter();
    nextPage = new EventEmitter();
    beforeSubmit = new EventEmitter();
    rowAdd = new EventEmitter();
    rowAdded = new EventEmitter();
    rowEdit = new EventEmitter();
    rowEdited = new EventEmitter();
    rowDelete = new EventEmitter();
    rowClick = new EventEmitter();
    rowSelectChange = new EventEmitter();
    page = new EventEmitter();
    changeItemsPerPage = new EventEmitter();
    change = new EventEmitter();
    invalid = new EventEmitter();
    errorChange = new EventEmitter();
    formLoad = new EventEmitter();
    submissionLoad = new EventEmitter();
    ready = new EventEmitter();
    formioElement;
    AlertsPosition = AlertsPosition;
    formio;
    initialized = false;
    alerts = new FormioAlerts();
    formioReady;
    formioReadyResolve;
    submitting = false;
    submissionSuccess = false;
    isLoading;
    noAlerts;
    label;
    constructor(ngZone, config, customTags) {
        this.ngZone = ngZone;
        this.config = config;
        this.customTags = customTags;
        this.isLoading = true;
        this.formioReady = new Promise((ready) => {
            this.formioReadyResolve = ready;
        });
    }
    getRenderer() {
        return this.renderer;
    }
    getRendererOptions() {
        const extraTags = this.customTags ? this.customTags.tags : [];
        return assign({}, {
            icons: get(this.config, 'icons', 'fontawesome'),
            noAlerts: get(this.options, 'noAlerts', true),
            readOnly: this.readOnly,
            viewAsHtml: this.viewOnly,
            ...(this.viewOnly && { renderMode: "html" }),
            i18n: get(this.options, 'i18n', null),
            fileService: get(this.options, 'fileService', null),
            hooks: this.hooks,
            sanitizeConfig: {
                addTags: extraTags
            },
            dataTableActions: this.dataTableActions
        }, this.renderOptions || {});
    }
    createRenderer() {
        const Renderer = this.getRenderer();
        const form = (new Renderer(this.formioElement ? this.formioElement.nativeElement : null, this.form, this.getRendererOptions()));
        return form.instance;
    }
    setFormUrl(url) {
        this.formio.setUrl(url, this.formioOptions || {});
    }
    setForm(form) {
        this.form = form;
        if (this.formio) {
            this.formio.destroy();
        }
        if (this.form.title) {
            this.label = this.form.title;
        }
        else if (this.form.components && this.form.components[0]) {
            this.label = this.form.components[0].label;
        }
        // Clear out the element to render the new form.
        if (this.formioElement && this.formioElement.nativeElement) {
            this.formioElement.nativeElement.innerHTML = '';
        }
        this.formio = this.createRenderer();
        if (!this.formio) {
            return;
        }
        this.formio.setSubmission(this.submission, {
            fromSubmission: false
        });
        if (this.renderOptions && this.renderOptions.validateOnInit) {
            this.formio.setValue(this.submission, { validateOnInit: true });
        }
        if (this.url) {
            this.setFormUrl(this.url);
        }
        if (this.src) {
            this.setFormUrl(this.src);
        }
        this.formio.nosubmit = true;
        this.attachFormEvents();
        return this.formio.ready.then(() => {
            this.ngZone.run(() => {
                this.isLoading = false;
                this.ready.emit(this);
                this.formioReadyResolve(this.formio);
                if (this.formio.submissionReady) {
                    this.formio.submissionReady.then((submission) => {
                        this.submissionLoad.emit(submission);
                    });
                }
            });
            return this.formio;
        });
    }
    attachFormEvents() {
        this.formio.on('prevPage', (data) => this.ngZone.run(() => this.onPrevPage(data)));
        this.formio.on('nextPage', (data) => this.ngZone.run(() => this.onNextPage(data)));
        this.formio.on('change', (value, flags, isModified) => this.ngZone.run(() => this.onChange(value, flags, isModified)));
        this.formio.on('rowAdd', (component) => this.ngZone.run(() => this.rowAdd.emit(component)));
        this.formio.on('rowAdded', (data, component) => this.ngZone.run(() => this.rowAdded.emit({ component, row: data })));
        this.formio.on('rowEdit', (data, rowIndex, index, component) => this.ngZone.run(() => this.rowEdit.emit({ component, row: data, rowIndex, index })));
        this.formio.on('rowEdited', (data, rowIndex, component) => this.ngZone.run(() => this.rowEdited.emit({ component, row: data, rowIndex })));
        this.formio.on('rowDelete', (data, rowIndex, index, component) => this.ngZone.run(() => this.rowDelete.emit({ component, row: data, rowIndex, index })));
        this.formio.on('rowClick', (row, rowIndex, index, component) => this.ngZone.run(() => this.rowClick.emit({ component, row, rowIndex, index })));
        this.formio.on('rowSelectChange', (selectedRows, component) => this.ngZone.run(() => this.rowSelectChange.emit({ selectedRows, component })));
        this.formio.on('page', (currentPage, component) => this.ngZone.run(() => this.page.emit({ currentPage, component })));
        this.formio.on('changeItemsPerPage', (itemsPerPage) => this.ngZone.run(() => this.changeItemsPerPage.emit({ itemsPerPage })));
        this.formio.on('customEvent', (event) => this.ngZone.run(() => this.customEvent.emit(event)));
        ['fileUploadingStart', 'fileUploadingEnd'].forEach((eventName, index) => {
            const status = !!index ? 'end' : 'start';
            this.formio.on(eventName, () => this.ngZone.run(() => this.fileUploadingStatus.emit(status)));
        });
        this.formio.on('submit', (submission, saved) => this.ngZone.run(() => this.submitForm(submission, saved)));
        this.formio.on('error', (err) => this.ngZone.run(() => {
            this.submissionSuccess = false;
            return this.onError(err);
        }));
        this.formio.on('render', () => this.ngZone.run(() => this.render.emit()));
        this.formio.on('formLoad', (loadedForm) => this.ngZone.run(() => this.formLoad.emit(loadedForm)));
    }
    initialize() {
        if (this.initialized) {
            return;
        }
        const extraTags = this.customTags ? this.customTags.tags : [];
        const defaultOptions = {
            errors: {
                message: 'Please fix the following errors before submitting.'
            },
            alerts: {
                submitMessage: 'Submission Complete.'
            },
            disableAlerts: false,
            hooks: {
                beforeSubmit: null
            },
            sanitizeConfig: {
                addTags: extraTags
            },
            alertsPosition: AlertsPosition.top,
        };
        this.options = Object.assign(defaultOptions, this.options);
        if (this.options.disableAlerts) {
            this.options.alertsPosition = AlertsPosition.none;
        }
        this.initialized = true;
    }
    ngOnInit() {
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (this.language) {
            if (typeof this.language === 'string') {
                this.formio.language = this.language;
            }
            else {
                this.language.subscribe((lang) => {
                    this.formio.language = lang;
                });
            }
        }
        if (this.refresh) {
            this.refresh.subscribe((refresh) => this.onRefresh(refresh));
        }
        if (this.error) {
            this.error.subscribe((err) => this.onError(err));
        }
        if (this.success) {
            this.success.subscribe((message) => {
                this.alerts.setAlert({
                    type: 'success',
                    message: message || get(this.options, 'alerts.submitMessage')
                });
            });
        }
        if (this.submitDone) {
            this.submitDone.subscribe((submission) => {
                this.formio.emit('submitDone', submission);
            });
        }
        if (this.src) {
            if (!this.service) {
                this.service = new FormioService(this.src);
            }
            this.isLoading = true;
            this.setFormFromSrc();
        }
        if (this.url && !this.service) {
            this.service = new FormioService(this.url);
        }
    }
    setFormFromSrc() {
        this.service.loadForm({ params: { live: 1 } }).subscribe((form) => {
            if (form && form.components) {
                this.ngZone.runOutsideAngular(() => {
                    this.setForm(form);
                });
            }
            // if a submission is also provided.
            if (isEmpty(this.submission) &&
                this.service &&
                this.service.formio.submissionId) {
                this.service.loadSubmission().subscribe((submission) => {
                    if (this.readOnly) {
                        this.formio.options.readOnly = true;
                    }
                    this.submission = this.formio.submission = submission;
                }, err => this.onError(err));
            }
        }, err => this.onError(err));
    }
    ngOnDestroy() {
        if (this.formio) {
            this.formio.destroy();
        }
    }
    onRefresh(refresh) {
        this.formioReady.then(() => {
            if (refresh.form) {
                this.formio.setForm(refresh.form).then(() => {
                    if (refresh.submission) {
                        this.formio.setSubmission(refresh.submission);
                    }
                });
            }
            else if (refresh.submission) {
                this.formio.setSubmission(refresh.submission);
            }
            else {
                switch (refresh.property) {
                    case 'submission':
                        this.formio.submission = refresh.value;
                        break;
                    case 'form':
                        this.formio.form = refresh.value;
                        break;
                }
            }
        });
    }
    ngOnChanges(changes) {
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (changes.form && changes.form.currentValue) {
            this.ngZone.runOutsideAngular(() => {
                this.setForm(changes.form.currentValue);
            });
        }
        this.formioReady.then(() => {
            if (changes.submission && changes.submission.currentValue) {
                this.formio.setSubmission(changes.submission.currentValue, {
                    fromSubmission: !changes.submission.firstChange
                });
            }
            if (changes.hideComponents && changes.hideComponents.currentValue) {
                const hiddenComponents = changes.hideComponents.currentValue;
                this.formio.options.hide = hiddenComponents;
                this.formio.everyComponent((component) => {
                    component.options.hide = hiddenComponents;
                    if (hiddenComponents.includes(component.component.key)) {
                        component.visible = false;
                    }
                });
            }
        });
    }
    onPrevPage(data) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data);
    }
    onNextPage(data) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data);
    }
    onSubmit(submission, saved, noemit) {
        this.submitting = false;
        this.submissionSuccess = true;
        this.formio.setValue(fastCloneDeep(submission), {
            noValidate: true,
            noCheck: true
        });
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        if (!noemit) {
            this.submit.emit(submission);
        }
        if (!this.success) {
            this.alerts.setAlert({
                type: 'success',
                message: get(this.options, 'alerts.submitMessage')
            });
        }
    }
    onError(err) {
        this.alerts.setAlerts([]);
        this.submitting = false;
        this.isLoading = false;
        if (!err) {
            return;
        }
        // Make sure it is an array.
        const errors = Array.isArray(err) ? err : [err];
        // Emit these errors again.
        this.errorChange.emit(errors);
        if (err.silent) {
            return;
        }
        if (this.formio && errors.length) {
            this.formio.emit('submitError', errors);
        }
        // Iterate through each one and set the alerts array.
        errors.forEach((error) => {
            const { message, paths, } = error
                ? error.details
                    ? {
                        message: error.details.map((detail) => detail.message),
                        paths: error.details.map((detail) => detail.path),
                    }
                    : {
                        message: error.message || error.toString(),
                        paths: error.path ? [error.path] : [],
                    }
                : {
                    message: '',
                    paths: [],
                };
            let shouldErrorDisplay = true;
            if (this.formio) {
                paths.forEach((path, index) => {
                    const component = this.formio.getComponent(path);
                    if (component) {
                        const components = Array.isArray(component) ? component : [component];
                        const messageText = Array.isArray(message) ? message[index] : message;
                        components.forEach((comp) => comp.setCustomValidity(messageText, true));
                        this.alerts.addAlert({
                            type: 'danger',
                            message: message[index],
                            component,
                        });
                        shouldErrorDisplay = false;
                    }
                });
                if (window.VPAT_ENABLED) {
                    if (typeof error === 'string' && this.formio.components) {
                        this.formio.components.forEach((comp) => {
                            if (comp && comp.type !== 'button') {
                                comp.setCustomValidity(message, true);
                            }
                        });
                    }
                }
                if (!this.noAlerts) {
                    this.formio.showErrors();
                }
            }
            if (shouldErrorDisplay) {
                this.alerts.addAlert({
                    type: 'danger',
                    message,
                    component: error.component,
                });
            }
        });
    }
    focusOnComponet(key) {
        if (this.formio) {
            this.formio.focusOnComponent(key);
        }
    }
    submitExecute(submission, saved = false) {
        if (this.service && !this.url && !saved) {
            this.service
                .saveSubmission(submission)
                .subscribe((sub) => this.onSubmit(sub, true), err => this.onError(err));
        }
        else {
            this.onSubmit(submission, false);
        }
    }
    submitForm(submission, saved = false) {
        // Keep double submits from occurring...
        if (this.submitting) {
            return;
        }
        this.formio.setMetadata(submission);
        this.submissionSuccess = false;
        this.submitting = true;
        this.beforeSubmit.emit(submission);
        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        const beforeSubmit = get(this.options, 'hooks.beforeSubmit');
        if (beforeSubmit) {
            beforeSubmit(submission, (err, sub) => {
                if (err) {
                    this.onError(err);
                    return;
                }
                this.submitExecute(sub, saved);
            });
        }
        else {
            this.submitExecute(submission, saved);
        }
    }
    onChange(value, flags, isModified) {
        if (this.watchSubmissionErrors && !this.submissionSuccess) {
            const errors = get(this, 'formio.errors', []);
            const alerts = get(this, 'alerts.alerts', []);
            const submitted = get(this, 'formio.submitted', false);
            if (submitted && (errors.length || alerts.length)) {
                this.onError(errors);
            }
        }
        return this.change.emit({ ...value, flags, isModified });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioBaseComponent, deps: [{ token: i0.NgZone }, { token: i1.FormioAppConfig, optional: true }, { token: i2.CustomTagsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioBaseComponent, selector: "ng-component", inputs: { form: "form", submission: "submission", src: "src", url: "url", service: "service", options: "options", noeval: "noeval", formioOptions: "formioOptions", renderOptions: "renderOptions", readOnly: "readOnly", viewOnly: "viewOnly", hideLoading: "hideLoading", hideComponents: "hideComponents", refresh: "refresh", error: "error", success: "success", submitDone: "submitDone", language: "language", hooks: "hooks", renderer: "renderer", watchSubmissionErrors: "watchSubmissionErrors", dataTableActions: "dataTableActions" }, outputs: { render: "render", customEvent: "customEvent", fileUploadingStatus: "fileUploadingStatus", submit: "submit", prevPage: "prevPage", nextPage: "nextPage", beforeSubmit: "beforeSubmit", rowAdd: "rowAdd", rowAdded: "rowAdded", rowEdit: "rowEdit", rowEdited: "rowEdited", rowDelete: "rowDelete", rowClick: "rowClick", rowSelectChange: "rowSelectChange", page: "page", changeItemsPerPage: "changeItemsPerPage", change: "change", invalid: "invalid", errorChange: "errorChange", formLoad: "formLoad", submissionLoad: "submissionLoad", ready: "ready" }, viewQueries: [{ propertyName: "formioElement", first: true, predicate: ["formio"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '', isInline: true });
}
export { FormioBaseComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioBaseComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.FormioAppConfig, decorators: [{
                    type: Optional
                }] }, { type: i2.CustomTagsService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { form: [{
                type: Input
            }], submission: [{
                type: Input
            }], src: [{
                type: Input
            }], url: [{
                type: Input
            }], service: [{
                type: Input
            }], options: [{
                type: Input
            }], noeval: [{
                type: Input
            }], formioOptions: [{
                type: Input
            }], renderOptions: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], viewOnly: [{
                type: Input
            }], hideLoading: [{
                type: Input
            }], hideComponents: [{
                type: Input
            }], refresh: [{
                type: Input
            }], error: [{
                type: Input
            }], success: [{
                type: Input
            }], submitDone: [{
                type: Input
            }], language: [{
                type: Input
            }], hooks: [{
                type: Input
            }], renderer: [{
                type: Input
            }], watchSubmissionErrors: [{
                type: Input
            }], dataTableActions: [{
                type: Input
            }], render: [{
                type: Output
            }], customEvent: [{
                type: Output
            }], fileUploadingStatus: [{
                type: Output
            }], submit: [{
                type: Output
            }], prevPage: [{
                type: Output
            }], nextPage: [{
                type: Output
            }], beforeSubmit: [{
                type: Output
            }], rowAdd: [{
                type: Output
            }], rowAdded: [{
                type: Output
            }], rowEdit: [{
                type: Output
            }], rowEdited: [{
                type: Output
            }], rowDelete: [{
                type: Output
            }], rowClick: [{
                type: Output
            }], rowSelectChange: [{
                type: Output
            }], page: [{
                type: Output
            }], changeItemsPerPage: [{
                type: Output
            }], change: [{
                type: Output
            }], invalid: [{
                type: Output
            }], errorChange: [{
                type: Output
            }], formLoad: [{
                type: Output
            }], submissionLoad: [{
                type: Output
            }], ready: [{
                type: Output
            }], formioElement: [{
                type: ViewChild,
                args: ['formio', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybWlvQmFzZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3NyYy9Gb3JtaW9CYXNlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBd0MsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUksT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUdqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFDekQsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFFM0MsTUFHYSxtQkFBbUI7SUE2RHJCO0lBQ1k7SUFDQTtJQTlEWixJQUFJLENBQWM7SUFDbEIsVUFBVSxHQUFTLEVBQUUsQ0FBQztJQUN0QixHQUFHLENBQVU7SUFDYixHQUFHLENBQVU7SUFDYixPQUFPLENBQWlCO0lBQ3hCLE9BQU8sQ0FBaUI7SUFDeEIsTUFBTSxHQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDNUIsYUFBYSxDQUFPO0lBQ3BCLGFBQWEsQ0FBTztJQUNwQixRQUFRLEdBQUssS0FBSyxDQUFDO0lBQ25CLFFBQVEsR0FBSyxLQUFLLENBQUM7SUFDbkIsV0FBVyxHQUFLLEtBQUssQ0FBQztJQUN0QixjQUFjLENBQVk7SUFDMUIsT0FBTyxDQUFvQztJQUMzQyxLQUFLLENBQXFCO0lBQzFCLE9BQU8sQ0FBd0I7SUFDL0IsVUFBVSxD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QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFVLEVBQUUsS0FBVSxFQUFFLFVBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBYyxFQUFFLEVBQUUsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBUyxFQUFFLFNBQWMsRUFBRSxFQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQVMsRUFBRSxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFjLEVBQUUsRUFBRSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtB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c0JBQWYsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLG1CQUFtQjtzQkFBNUIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxrQkFBa0I7c0JBQTNCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNO2dCQUNnQyxhQUFhO3NCQUFuRCxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1pb1NlcnZpY2UgfSBmcm9tICcuL2Zvcm1pby5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnLi9jb21wb25lbnRzL2FsZXJ0cy9mb3JtaW8uYWxlcnRzJztcclxuaW1wb3J0IHsgRm9ybWlvQXBwQ29uZmlnIH0gZnJvbSAnLi9mb3JtaW8uY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvRXJyb3IsIEZvcm1pb0Zvcm0sIEZvcm1pb09wdGlvbnMsIEZvcm1pb1JlZnJlc2hWYWx1ZSB9IGZyb20gJy4vZm9ybWlvLmNvbW1vbic7XHJcbmltcG9ydCB7IGFzc2lnbiwgZ2V0LCBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgQ3VzdG9tVGFnc1NlcnZpY2UgfSBmcm9tICcuL2N1c3RvbS1jb21wb25lbnQvY3VzdG9tLXRhZ3Muc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnQGZvcm1pby9qcyc7XHJcbmltcG9ydCB7IEFsZXJ0c1Bvc2l0aW9uIH0gZnJvbSAnLi90eXBlcy9hbGVydHMtcG9zaXRpb24nO1xyXG5jb25zdCB7IEV2YWx1YXRvciwgZmFzdENsb25lRGVlcCB9ID0gVXRpbHM7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb0Jhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBmb3JtPzogRm9ybWlvRm9ybTtcclxuICBASW5wdXQoKSBzdWJtaXNzaW9uPzogYW55ID0ge307XHJcbiAgQElucHV0KCkgc3JjPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHVybD86IHN0cmluZztcclxuICBASW5wdXQoKSBzZXJ2aWNlPzogRm9ybWlvU2VydmljZTtcclxuICBASW5wdXQoKSBvcHRpb25zPzogRm9ybWlvT3B0aW9ucztcclxuICBASW5wdXQoKSBub2V2YWwgPyA9IEV2YWx1YXRvci5ub2V2YWw7XHJcbiAgQElucHV0KCkgZm9ybWlvT3B0aW9ucz86IGFueTtcclxuICBASW5wdXQoKSByZW5kZXJPcHRpb25zPzogYW55O1xyXG4gIEBJbnB1dCgpIHJlYWRPbmx5ID8gPSBmYWxzZTtcclxuICBASW5wdXQoKSB2aWV3T25seSA/ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGlkZUxvYWRpbmcgPyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhpZGVDb21wb25lbnRzPzogc3RyaW5nW107XHJcbiAgQElucHV0KCkgcmVmcmVzaD86IEV2ZW50RW1pdHRlcjxGb3JtaW9SZWZyZXNoVmFsdWU+O1xyXG4gIEBJbnB1dCgpIGVycm9yPzogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQElucHV0KCkgc3VjY2Vzcz86IEV2ZW50RW1pdHRlcjxvYmplY3Q+O1xyXG4gIEBJbnB1dCgpIHN1Ym1pdERvbmU/OiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBASW5wdXQoKSBsYW5ndWFnZT86IEV2ZW50RW1pdHRlcjxzdHJpbmc+O1xyXG4gIEBJbnB1dCgpIGhvb2tzPzogYW55ID0ge307XHJcbiAgQElucHV0KCkgcmVuZGVyZXI/OiBhbnk7XHJcbiAgQElucHV0KCkgd2F0Y2hTdWJtaXNzaW9uRXJyb3JzID8gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkYXRhVGFibGVBY3Rpb25zPyA6IGFueSA9IFtdXHJcbiAgQE91dHB1dCgpIHJlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIEBPdXRwdXQoKSBjdXN0b21FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIEBPdXRwdXQoKSBmaWxlVXBsb2FkaW5nU3RhdHVzID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQE91dHB1dCgpIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIEBPdXRwdXQoKSBwcmV2UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIEBPdXRwdXQoKSBuZXh0UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIEBPdXRwdXQoKSBiZWZvcmVTdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcclxuICBAT3V0cHV0KCkgcm93QWRkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHJvd0FkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHJvd0VkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcm93RWRpdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHJvd0RlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSByb3dTZWxlY3RDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2VJdGVtc1BlclBhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcbiAgQE91dHB1dCgpIGludmFsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIGZvcm1Mb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHN1Ym1pc3Npb25Mb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtaW9CYXNlQ29tcG9uZW50PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1pbycsIHsgc3RhdGljOiB0cnVlIH0pIGZvcm1pb0VsZW1lbnQ/OiBFbGVtZW50UmVmPGFueT47XHJcblxyXG4gIHB1YmxpYyBBbGVydHNQb3NpdGlvbiA9IEFsZXJ0c1Bvc2l0aW9uO1xyXG4gIHB1YmxpYyBmb3JtaW86IGFueTtcclxuICBwdWJsaWMgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgYWxlcnRzID0gbmV3IEZvcm1pb0FsZXJ0cygpO1xyXG4gIHB1YmxpYyBmb3JtaW9SZWFkeTogUHJvbWlzZTxhbnk+O1xyXG5cclxuICBwcml2YXRlIGZvcm1pb1JlYWR5UmVzb2x2ZTogYW55O1xyXG4gIHByaXZhdGUgc3VibWl0dGluZyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgc3VibWlzc2lvblN1Y2Nlc3MgPSBmYWxzZTtcclxuICBwdWJsaWMgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIHB1YmxpYyBub0FsZXJ0czogYm9vbGVhbjtcclxuICBwdWJsaWMgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgY29uZmlnOiBGb3JtaW9BcHBDb25maWcsXHJcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgY3VzdG9tVGFncz86IEN1c3RvbVRhZ3NTZXJ2aWNlLFxyXG4gICkge1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5mb3JtaW9SZWFkeSA9IG5ldyBQcm9taXNlKChyZWFkeSkgPT4ge1xyXG4gICAgICB0aGlzLmZvcm1pb1JlYWR5UmVzb2x2ZSA9IHJlYWR5O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZW5kZXJlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlcmVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVuZGVyZXJPcHRpb25zKCkge1xyXG4gICAgY29uc3QgZXh0cmFUYWdzID0gdGhpcy5jdXN0b21UYWdzID8gdGhpcy5jdXN0b21UYWdzLnRhZ3MgOiBbXTtcclxuICAgIHJldHVybiBhc3NpZ24oe30sIHtcclxuICAgICAgaWNvbnM6IGdldCh0aGlzLmNvbmZpZywgJ2ljb25zJywgJ2ZvbnRhd2Vzb21lJyksXHJcbiAgICAgIG5vQWxlcnRzOiBnZXQodGhpcy5vcHRpb25zLCAnbm9BbGVydHMnLCB0cnVlKSxcclxuICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgIHZpZXdBc0h0bWw6IHRoaXMudmlld09ubHksXHJcbiAgICAgIC4uLih0aGlzLnZpZXdPbmx5ICYmIHsgcmVuZGVyTW9kZTogXCJodG1sXCIgfSksXHJcbiAgICAgIGkxOG46IGdldCh0aGlzLm9wdGlvbnMsICdpMThuJywgbnVsbCksXHJcbiAgICAgIGZpbGVTZXJ2aWNlOiBnZXQodGhpcy5vcHRpb25zLCAnZmlsZVNlcnZpY2UnLCBudWxsKSxcclxuICAgICAgaG9va3M6IHRoaXMuaG9va3MsXHJcbiAgICAgIHNhbml0aXplQ29uZmlnOiB7XHJcbiAgICAgICAgYWRkVGFnczogZXh0cmFUYWdzXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGFUYWJsZUFjdGlvbnM6IHRoaXMuZGF0YVRhYmxlQWN0aW9uc1xyXG4gICAgfSwgdGhpcy5yZW5kZXJPcHRpb25zIHx8IHt9KTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJlbmRlcmVyKCkge1xyXG4gICAgY29uc3QgUmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKCk7XHJcbiAgICBjb25zdCBmb3JtID0gKG5ldyBSZW5kZXJlcihcclxuICAgICAgdGhpcy5mb3JtaW9FbGVtZW50ID8gdGhpcy5mb3JtaW9FbGVtZW50Lm5hdGl2ZUVsZW1lbnQgOiBudWxsLFxyXG4gICAgICB0aGlzLmZvcm0sXHJcbiAgICAgIHRoaXMuZ2V0UmVuZGVyZXJPcHRpb25zKClcclxuICAgICkpO1xyXG4gICAgcmV0dXJuIGZvcm0uaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBzZXRGb3JtVXJsKHVybCkge1xyXG4gICAgdGhpcy5mb3JtaW8uc2V0VXJsKHVybCwgdGhpcy5mb3JtaW9PcHRpb25zIHx8IHt9KTtcclxuICB9XHJcblxyXG4gIHNldEZvcm0oZm9ybTogRm9ybWlvRm9ybSkge1xyXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcclxuICAgIGlmICh0aGlzLmZvcm1pbykge1xyXG4gICAgICB0aGlzLmZvcm1pby5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9ybS50aXRsZSkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5mb3JtLnRpdGxlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm0uY29tcG9uZW50cyAmJiB0aGlzLmZvcm0uY29tcG9uZW50c1swXSkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5mb3JtLmNvbXBvbmVudHNbMF0ubGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xlYXIgb3V0IHRoZSBlbGVtZW50IHRvIHJlbmRlciB0aGUgbmV3IGZvcm0uXHJcbiAgICBpZiAodGhpcy5mb3JtaW9FbGVtZW50ICYmIHRoaXMuZm9ybWlvRWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZm9ybWlvRWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtaW8gPSB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XHJcblxyXG4gICAgaWYoIXRoaXMuZm9ybWlvKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZm9ybWlvLnNldFN1Ym1pc3Npb24odGhpcy5zdWJtaXNzaW9uLCB7XHJcbiAgICAgIGZyb21TdWJtaXNzaW9uOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5yZW5kZXJPcHRpb25zICYmIHRoaXMucmVuZGVyT3B0aW9ucy52YWxpZGF0ZU9uSW5pdCkge1xyXG4gICAgICB0aGlzLmZvcm1pby5zZXRWYWx1ZSh0aGlzLnN1Ym1pc3Npb24sIHt2YWxpZGF0ZU9uSW5pdDogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudXJsKSB7XHJcbiAgICAgIHRoaXMuc2V0Rm9ybVVybCh0aGlzLnVybCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zcmMpIHtcclxuICAgICAgdGhpcy5zZXRGb3JtVXJsKHRoaXMuc3JjKTtcclxuICAgIH1cclxuICAgIHRoaXMuZm9ybWlvLm5vc3VibWl0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXR0YWNoRm9ybUV2ZW50cygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmZvcm1pby5yZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVhZHkuZW1pdCh0aGlzKTtcclxuICAgICAgICB0aGlzLmZvcm1pb1JlYWR5UmVzb2x2ZSh0aGlzLmZvcm1pbyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybWlvLnN1Ym1pc3Npb25SZWFkeSkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtaW8uc3VibWlzc2lvblJlYWR5LnRoZW4oKHN1Ym1pc3Npb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXNzaW9uTG9hZC5lbWl0KHN1Ym1pc3Npb24pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMuZm9ybWlvO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhdHRhY2hGb3JtRXZlbnRzKCkge1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3ByZXZQYWdlJywgKGRhdGE6IGFueSkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMub25QcmV2UGFnZShkYXRhKSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ25leHRQYWdlJywgKGRhdGE6IGFueSkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMub25OZXh0UGFnZShkYXRhKSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ2NoYW5nZScsICh2YWx1ZTogYW55LCBmbGFnczogYW55LCBpc01vZGlmaWVkOiBib29sZWFuKSA9PiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5vbkNoYW5nZSh2YWx1ZSwgZmxhZ3MsIGlzTW9kaWZpZWQpKSk7XHJcbiAgICB0aGlzLmZvcm1pby5vbigncm93QWRkJywgKGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93QWRkLmVtaXQoY29tcG9uZW50KSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3Jvd0FkZGVkJywgKGRhdGE6IGFueSwgY29tcG9uZW50OiBhbnkpID0+ICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5yb3dBZGRlZC5lbWl0KHtjb21wb25lbnQsIHJvdzogZGF0YX0pKSk7XHJcbiAgICB0aGlzLmZvcm1pby5vbigncm93RWRpdCcsIChkYXRhOiBhbnksIHJvd0luZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93RWRpdC5lbWl0KHtjb21wb25lbnQsIHJvdzogZGF0YSwgcm93SW5kZXgsIGluZGV4fSkpKTtcclxuICAgIHRoaXMuZm9ybWlvLm9uKCdyb3dFZGl0ZWQnLCAoZGF0YTogYW55LCByb3dJbmRleDogbnVtYmVyLCBjb21wb25lbnQ6IGFueSkgPT4gIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnJvd0VkaXRlZC5lbWl0KHtjb21wb25lbnQsIHJvdzogZGF0YSwgcm93SW5kZXh9KSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3Jvd0RlbGV0ZScsIChkYXRhOiBhbnksIHJvd0luZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93RGVsZXRlLmVtaXQoe2NvbXBvbmVudCwgcm93OiBkYXRhLCByb3dJbmRleCwgaW5kZXh9KSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3Jvd0NsaWNrJywgKHJvdzogYW55LCByb3dJbmRleDogbnVtYmVyLCBpbmRleDogbnVtYmVyLGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93Q2xpY2suZW1pdCh7Y29tcG9uZW50LCByb3csIHJvd0luZGV4LCBpbmRleH0pKSk7XHJcbiAgICB0aGlzLmZvcm1pby5vbigncm93U2VsZWN0Q2hhbmdlJywgKHNlbGVjdGVkUm93czogYW55W10sIGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93U2VsZWN0Q2hhbmdlLmVtaXQoe3NlbGVjdGVkUm93cywgY29tcG9uZW50fSkpKTtcclxuICAgIHRoaXMuZm9ybWlvLm9uKCdwYWdlJywgKGN1cnJlbnRQYWdlOiBudW1iZXIsIGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucGFnZS5lbWl0KHtjdXJyZW50UGFnZSwgY29tcG9uZW50fSkpKTtcclxuICAgIHRoaXMuZm9ybWlvLm9uKCdjaGFuZ2VJdGVtc1BlclBhZ2UnLCAoaXRlbXNQZXJQYWdlOm51bWJlcikgPT4gIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmNoYW5nZUl0ZW1zUGVyUGFnZS5lbWl0KHtpdGVtc1BlclBhZ2V9KSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ2N1c3RvbUV2ZW50JywgKGV2ZW50OiBhbnkpID0+XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmN1c3RvbUV2ZW50LmVtaXQoZXZlbnQpKVxyXG4gICAgKTtcclxuXHJcbiAgICBbJ2ZpbGVVcGxvYWRpbmdTdGFydCcsICdmaWxlVXBsb2FkaW5nRW5kJ10uZm9yRWFjaCgoZXZlbnROYW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBzdGF0dXMgPSAhIWluZGV4ID8gJ2VuZCcgOiAnc3RhcnQnO1xyXG4gICAgICB0aGlzLmZvcm1pby5vbihldmVudE5hbWUsICgpID0+XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZmlsZVVwbG9hZGluZ1N0YXR1cy5lbWl0KHN0YXR1cykpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZvcm1pby5vbignc3VibWl0JywgKHN1Ym1pc3Npb246IGFueSwgc2F2ZWQ6IGJvb2xlYW4pID0+XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnN1Ym1pdEZvcm0oc3VibWlzc2lvbiwgc2F2ZWQpKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZm9ybWlvLm9uKCdlcnJvcicsIChlcnI6IGFueSkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5zdWJtaXNzaW9uU3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICByZXR1cm4gdGhpcy5vbkVycm9yKGVycik7XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLmZvcm1pby5vbigncmVuZGVyJywgKCkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucmVuZGVyLmVtaXQoKSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ2Zvcm1Mb2FkJywgKGxvYWRlZEZvcm06IGFueSkgPT5cclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZm9ybUxvYWQuZW1pdChsb2FkZWRGb3JtKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dHJhVGFncyA9IHRoaXMuY3VzdG9tVGFncyA/IHRoaXMuY3VzdG9tVGFncy50YWdzIDogW107XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogRm9ybWlvT3B0aW9ucyA9IHtcclxuICAgICAgZXJyb3JzOiB7XHJcbiAgICAgICAgbWVzc2FnZTogJ1BsZWFzZSBmaXggdGhlIGZvbGxvd2luZyBlcnJvcnMgYmVmb3JlIHN1Ym1pdHRpbmcuJ1xyXG4gICAgICB9LFxyXG4gICAgICBhbGVydHM6IHtcclxuICAgICAgICBzdWJtaXRNZXNzYWdlOiAnU3VibWlzc2lvbiBDb21wbGV0ZS4nXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpc2FibGVBbGVydHM6IGZhbHNlLFxyXG4gICAgICBob29rczoge1xyXG4gICAgICAgIGJlZm9yZVN1Ym1pdDogbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBzYW5pdGl6ZUNvbmZpZzoge1xyXG4gICAgICAgIGFkZFRhZ3M6IGV4dHJhVGFnc1xyXG4gICAgICB9LFxyXG4gICAgICBhbGVydHNQb3NpdGlvbjogQWxlcnRzUG9zaXRpb24udG9wLFxyXG4gICAgfTtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVBbGVydHMpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmFsZXJ0c1Bvc2l0aW9uID0gQWxlcnRzUG9zaXRpb24ubm9uZTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBFdmFsdWF0b3Iubm9ldmFsID0gdGhpcy5ub2V2YWw7XHJcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5sYW5ndWFnZSkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8ubGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2Uuc3Vic2NyaWJlKChsYW5nOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHRoaXMuZm9ybWlvLmxhbmd1YWdlID0gbGFuZztcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgocmVmcmVzaDogRm9ybWlvUmVmcmVzaFZhbHVlKSA9PlxyXG4gICAgICAgIHRoaXMub25SZWZyZXNoKHJlZnJlc2gpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZXJyb3IpIHtcclxuICAgICAgdGhpcy5lcnJvci5zdWJzY3JpYmUoKGVycjogYW55KSA9PiB0aGlzLm9uRXJyb3IoZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VjY2Vzcykge1xyXG4gICAgICB0aGlzLnN1Y2Nlc3Muc3Vic2NyaWJlKChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydCh7XHJcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlIHx8IGdldCh0aGlzLm9wdGlvbnMsICdhbGVydHMuc3VibWl0TWVzc2FnZScpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1Ym1pdERvbmUpIHtcclxuICAgICAgdGhpcy5zdWJtaXREb25lLnN1YnNjcmliZSgoc3VibWlzc2lvbjogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8uZW1pdCgnc3VibWl0RG9uZScsIHN1Ym1pc3Npb24pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zcmMpIHtcclxuICAgICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgRm9ybWlvU2VydmljZSh0aGlzLnNyYyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNldEZvcm1Gcm9tU3JjKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy51cmwgJiYgIXRoaXMuc2VydmljZSkge1xyXG4gICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgRm9ybWlvU2VydmljZSh0aGlzLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRGb3JtRnJvbVNyYygpIHtcclxuICAgIHRoaXMuc2VydmljZS5sb2FkRm9ybSh7IHBhcmFtczogeyBsaXZlOiAxIH0gfSkuc3Vic2NyaWJlKFxyXG4gICAgICAoZm9ybTogRm9ybWlvRm9ybSkgPT4ge1xyXG4gICAgICAgIGlmIChmb3JtICYmIGZvcm0uY29tcG9uZW50cykge1xyXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEZvcm0oZm9ybSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGEgc3VibWlzc2lvbiBpcyBhbHNvIHByb3ZpZGVkLlxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGlzRW1wdHkodGhpcy5zdWJtaXNzaW9uKSAmJlxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlICYmXHJcbiAgICAgICAgICB0aGlzLnNlcnZpY2UuZm9ybWlvLnN1Ym1pc3Npb25JZFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLmxvYWRTdWJtaXNzaW9uKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoc3VibWlzc2lvbjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybWlvLm9wdGlvbnMucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLnN1Ym1pc3Npb24gPSB0aGlzLmZvcm1pby5zdWJtaXNzaW9uID0gc3VibWlzc2lvbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5mb3JtaW8pIHtcclxuICAgICAgdGhpcy5mb3JtaW8uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25SZWZyZXNoKHJlZnJlc2g6IEZvcm1pb1JlZnJlc2hWYWx1ZSkge1xyXG4gICAgdGhpcy5mb3JtaW9SZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZnJlc2guZm9ybSkge1xyXG4gICAgICAgIHRoaXMuZm9ybWlvLnNldEZvcm0ocmVmcmVzaC5mb3JtKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGlmIChyZWZyZXNoLnN1Ym1pc3Npb24pIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtaW8uc2V0U3VibWlzc2lvbihyZWZyZXNoLnN1Ym1pc3Npb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKHJlZnJlc2guc3VibWlzc2lvbikge1xyXG4gICAgICAgIHRoaXMuZm9ybWlvLnNldFN1Ym1pc3Npb24ocmVmcmVzaC5zdWJtaXNzaW9uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2l0Y2ggKHJlZnJlc2gucHJvcGVydHkpIHtcclxuICAgICAgICAgIGNhc2UgJ3N1Ym1pc3Npb24nOlxyXG4gICAgICAgICAgICB0aGlzLmZvcm1pby5zdWJtaXNzaW9uID0gcmVmcmVzaC52YWx1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdmb3JtJzpcclxuICAgICAgICAgICAgdGhpcy5mb3JtaW8uZm9ybSA9IHJlZnJlc2gudmFsdWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgIEV2YWx1YXRvci5ub2V2YWwgPSB0aGlzLm5vZXZhbDtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIGlmIChjaGFuZ2VzLmZvcm0gJiYgY2hhbmdlcy5mb3JtLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRGb3JtKGNoYW5nZXMuZm9ybS5jdXJyZW50VmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZvcm1pb1JlYWR5LnRoZW4oKCkgPT4ge1xyXG4gICAgICBpZiAoY2hhbmdlcy5zdWJtaXNzaW9uICYmIGNoYW5nZXMuc3VibWlzc2lvbi5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICB0aGlzLmZvcm1pby5zZXRTdWJtaXNzaW9uKGNoYW5nZXMuc3VibWlzc2lvbi5jdXJyZW50VmFsdWUsIHtcclxuICAgICAgICAgIGZyb21TdWJtaXNzaW9uOiAhY2hhbmdlcy5zdWJtaXNzaW9uLmZpcnN0Q2hhbmdlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFuZ2VzLmhpZGVDb21wb25lbnRzICYmIGNoYW5nZXMuaGlkZUNvbXBvbmVudHMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ29tcG9uZW50cyA9IGNoYW5nZXMuaGlkZUNvbXBvbmVudHMuY3VycmVudFZhbHVlO1xyXG4gICAgICAgIHRoaXMuZm9ybWlvLm9wdGlvbnMuaGlkZSA9IGhpZGRlbkNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8uZXZlcnlDb21wb25lbnQoKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgY29tcG9uZW50Lm9wdGlvbnMuaGlkZSA9IGhpZGRlbkNvbXBvbmVudHM7XHJcbiAgICAgICAgICBpZiAoaGlkZGVuQ29tcG9uZW50cy5pbmNsdWRlcyhjb21wb25lbnQuY29tcG9uZW50LmtleSkpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblByZXZQYWdlKGRhdGE6IGFueSkge1xyXG4gICAgdGhpcy5hbGVydHMuc2V0QWxlcnRzKFtdKTtcclxuICAgIHRoaXMucHJldlBhZ2UuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIG9uTmV4dFBhZ2UoZGF0YTogYW55KSB7XHJcbiAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydHMoW10pO1xyXG4gICAgdGhpcy5uZXh0UGFnZS5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXQoc3VibWlzc2lvbjogYW55LCBzYXZlZDogYm9vbGVhbiwgbm9lbWl0PzogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zdWJtaXR0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1Ym1pc3Npb25TdWNjZXNzID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmZvcm1pby5zZXRWYWx1ZShmYXN0Q2xvbmVEZWVwKHN1Ym1pc3Npb24pLCB7XHJcbiAgICAgIG5vVmFsaWRhdGU6IHRydWUsXHJcbiAgICAgIG5vQ2hlY2s6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzYXZlZCkge1xyXG4gICAgICB0aGlzLmZvcm1pby5lbWl0KCdzdWJtaXREb25lJywgc3VibWlzc2lvbik7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5vZW1pdCkge1xyXG4gICAgICB0aGlzLnN1Ym1pdC5lbWl0KHN1Ym1pc3Npb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnN1Y2Nlc3MpIHtcclxuICAgICAgdGhpcy5hbGVydHMuc2V0QWxlcnQoe1xyXG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICBtZXNzYWdlOiBnZXQodGhpcy5vcHRpb25zLCAnYWxlcnRzLnN1Ym1pdE1lc3NhZ2UnKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRXJyb3IoZXJyOiBhbnkpIHtcclxuICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0cyhbXSk7XHJcbiAgICB0aGlzLnN1Ym1pdHRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFlcnIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ha2Ugc3VyZSBpdCBpcyBhbiBhcnJheS5cclxuICAgIGNvbnN0IGVycm9ycyA9IEFycmF5LmlzQXJyYXkoZXJyKSA/IGVyciA6IFtlcnJdO1xyXG5cclxuICAgIC8vIEVtaXQgdGhlc2UgZXJyb3JzIGFnYWluLlxyXG4gICAgdGhpcy5lcnJvckNoYW5nZS5lbWl0KGVycm9ycyk7XHJcblxyXG4gICAgaWYgKGVyci5zaWxlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvcm1pbyAmJiBlcnJvcnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZm9ybWlvLmVtaXQoJ3N1Ym1pdEVycm9yJywgZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBvbmUgYW5kIHNldCB0aGUgYWxlcnRzIGFycmF5LlxyXG4gICAgZXJyb3JzLmZvckVhY2goKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgcGF0aHMsXHJcbiAgICAgIH0gPSBlcnJvclxyXG4gICAgICAgID8gZXJyb3IuZGV0YWlsc1xyXG4gICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLmRldGFpbHMubWFwKChkZXRhaWwpID0+IGRldGFpbC5tZXNzYWdlKSxcclxuICAgICAgICAgICAgcGF0aHM6IGVycm9yLmRldGFpbHMubWFwKChkZXRhaWwpID0+IGRldGFpbC5wYXRoKSxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIHx8IGVycm9yLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIHBhdGhzOiBlcnJvci5wYXRoID8gW2Vycm9yLnBhdGhdIDogW10sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB7XHJcbiAgICAgICAgICBtZXNzYWdlOiAnJyxcclxuICAgICAgICAgIHBhdGhzOiBbXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgbGV0IHNob3VsZEVycm9yRGlzcGxheSA9IHRydWU7XHJcblxyXG4gICAgICBpZiAodGhpcy5mb3JtaW8pIHtcclxuICAgICAgICBwYXRocy5mb3JFYWNoKChwYXRoLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5mb3JtaW8uZ2V0Q29tcG9uZW50KHBhdGgpO1xyXG4gICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gQXJyYXkuaXNBcnJheShjb21wb25lbnQpID8gY29tcG9uZW50IDogW2NvbXBvbmVudF07XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VUZXh0ID0gQXJyYXkuaXNBcnJheShtZXNzYWdlKSA/IG1lc3NhZ2VbaW5kZXhdIDogbWVzc2FnZTtcclxuICAgICAgICAgICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wKSA9PiBjb21wLnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2VUZXh0LCB0cnVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxlcnRzLmFkZEFsZXJ0KHtcclxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlW2luZGV4XSxcclxuICAgICAgICAgICAgICBjb21wb25lbnQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzaG91bGRFcnJvckRpc3BsYXkgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5WUEFUX0VOQUJMRUQpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09J3N0cmluZycgJiYgdGhpcy5mb3JtaW8uY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1pby5jb21wb25lbnRzLmZvckVhY2goKGNvbXApID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY29tcCAmJiBjb21wLnR5cGUgIT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wLnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMubm9BbGVydHMpIHtcclxuICAgICAgICAgIHRoaXMuZm9ybWlvLnNob3dFcnJvcnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzaG91bGRFcnJvckRpc3BsYXkpIHtcclxuICAgICAgICB0aGlzLmFsZXJ0cy5hZGRBbGVydCh7XHJcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IGVycm9yLmNvbXBvbmVudCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmb2N1c09uQ29tcG9uZXQoa2V5OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmZvcm1pbykge1xyXG4gICAgICB0aGlzLmZvcm1pby5mb2N1c09uQ29tcG9uZW50KGtleSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdWJtaXRFeGVjdXRlKHN1Ym1pc3Npb246IG9iamVjdCwgc2F2ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKHRoaXMuc2VydmljZSAmJiAhdGhpcy51cmwgJiYgIXNhdmVkKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZVxyXG4gICAgICAgIC5zYXZlU3VibWlzc2lvbihzdWJtaXNzaW9uKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAoc3ViOiB7fSkgPT4gdGhpcy5vblN1Ym1pdChzdWIsIHRydWUpLFxyXG4gICAgICAgICAgZXJyID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25TdWJtaXQoc3VibWlzc2lvbiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3VibWl0Rm9ybShzdWJtaXNzaW9uOiBhbnksIHNhdmVkID0gZmFsc2UpIHtcclxuICAgIC8vIEtlZXAgZG91YmxlIHN1Ym1pdHMgZnJvbSBvY2N1cnJpbmcuLi5cclxuICAgIGlmICh0aGlzLnN1Ym1pdHRpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtaW8uc2V0TWV0YWRhdGEoc3VibWlzc2lvbik7XHJcbiAgICB0aGlzLnN1Ym1pc3Npb25TdWNjZXNzID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1Ym1pdHRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5iZWZvcmVTdWJtaXQuZW1pdChzdWJtaXNzaW9uKTtcclxuXHJcbiAgICAvLyBpZiB0aGV5IHByb3ZpZGUgYSBiZWZvcmVTdWJtaXQgaG9vaywgdGhlbiBhbGxvdyB0aGVtIHRvIGFsdGVyIHRoZSBzdWJtaXNzaW9uIGFzeW5jaHJvbm91c2x5XHJcbiAgICAvLyBvciBldmVuIHByb3ZpZGUgYSBjdXN0b20gRXJyb3IgbWV0aG9kLlxyXG4gICAgY29uc3QgYmVmb3JlU3VibWl0ID0gZ2V0KHRoaXMub3B0aW9ucywgJ2hvb2tzLmJlZm9yZVN1Ym1pdCcpO1xyXG4gICAgaWYgKGJlZm9yZVN1Ym1pdCkge1xyXG4gICAgICBiZWZvcmVTdWJtaXQoc3VibWlzc2lvbiwgKGVycjogRm9ybWlvRXJyb3IsIHN1Yjogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgdGhpcy5vbkVycm9yKGVycik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3VibWl0RXhlY3V0ZShzdWIsIHNhdmVkKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN1Ym1pdEV4ZWN1dGUoc3VibWlzc2lvbiwgc2F2ZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UodmFsdWU6IGFueSwgZmxhZ3M6IGFueSwgaXNNb2RpZmllZDogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMud2F0Y2hTdWJtaXNzaW9uRXJyb3JzICYmICF0aGlzLnN1Ym1pc3Npb25TdWNjZXNzKSB7XHJcbiAgICAgIGNvbnN0IGVycm9ycyA9IGdldCh0aGlzLCAnZm9ybWlvLmVycm9ycycsIFtdKTtcclxuICAgICAgY29uc3QgYWxlcnRzID0gZ2V0KHRoaXMsICdhbGVydHMuYWxlcnRzJywgW10pO1xyXG4gICAgICBjb25zdCBzdWJtaXR0ZWQgPSBnZXQodGhpcywgJ2Zvcm1pby5zdWJtaXR0ZWQnLCBmYWxzZSk7XHJcbiAgICAgIGlmIChzdWJtaXR0ZWQgJiYgKGVycm9ycy5sZW5ndGggfHwgYWxlcnRzLmxlbmd0aCkpIHtcclxuICAgICAgICB0aGlzLm9uRXJyb3IoZXJyb3JzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlLmVtaXQoey4uLnZhbHVlLCBmbGFncywgaXNNb2RpZmllZH0pO1xyXG4gIH1cclxufVxyXG4iXX0=