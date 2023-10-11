import { EventEmitter, Injectable, Optional } from '@angular/core';
import { FormioPromiseService } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import { Formio, Utils } from '@formio/js';
import _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular";
import * as i2 from "./resource.config";
import * as i3 from "./resources.service";
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceService, deps: [{ token: i1.FormioAppConfig }, { token: i2.FormioResourceConfig }, { token: i3.FormioResources, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceService });
}
export { FormioResourceService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResourceService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAppConfig }, { type: i2.FormioResourceConfig }, { type: i3.FormioResources, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9yZXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUluRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7OztBQUV2QixNQUNhLHFCQUFxQjtJQThCdkI7SUFDQTtJQUNZO0lBL0JkLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsSUFBSSxDQUFNO0lBQ1YsTUFBTSxDQUFlO0lBQ3JCLFFBQVEsQ0FBTTtJQUNkLFdBQVcsQ0FBVTtJQUNyQixPQUFPLENBQVM7SUFDaEIsVUFBVSxDQUF1QjtJQUNqQyxNQUFNLENBQXVCO0lBQzdCLE9BQU8sQ0FBbUM7SUFFMUMsZUFBZSxDQUFNO0lBQ3JCLGNBQWMsQ0FBTTtJQUNwQixjQUFjLENBQWdCO0lBRTlCLGVBQWUsQ0FBZ0I7SUFDL0IsVUFBVSxDQUFVO0lBQ3BCLFNBQVMsQ0FBTTtJQUVmLEtBQUssQ0FBZ0I7SUFDckIsWUFBWSxDQUFNO0lBQ2xCLFdBQVcsQ0FBTTtJQUVqQixXQUFXLENBQWdCO0lBQzNCLFVBQVUsQ0FBZTtJQUN6QixXQUFXLENBQU07SUFDakIsVUFBVSxDQUFNO0lBQ2hCLFNBQVMsQ0FBVTtJQUUxQixZQUNTLFNBQTBCLEVBQzFCLE1BQTRCLEVBQ2hCLGdCQUFpQztRQUY3QyxjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUMxQixXQUFNLEdBQU4s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LEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxNQUFNO2FBQ2YsZ0JBQWdCLEVBQUU7YUFDbEIsSUFBSSxDQUNILEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsRUFDRCxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDaEM7YUFDQSxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO3VHQXBQVSxxQkFBcUI7MkdBQXJCLHFCQUFxQjs7U0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVU7OzBCQWlDTixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ29uZmlnIH0gZnJvbSAnLi9yZXNvdXJjZS5jb25maWcnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZXMgfSBmcm9tICcuL3Jlc291cmNlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybWlvUHJvbWlzZVNlcnZpY2UgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW9BbGVydHMgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW9BcHBDb25maWcgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW9SZWZyZXNoVmFsdWUgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW8sIFV0aWxzIH0gZnJvbSAnQGZvcm1pby9qcyc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNvdXJjZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBmb3JtOiBhbnk7XHJcbiAgcHVibGljIGFsZXJ0czogRm9ybWlvQWxlcnRzO1xyXG4gIHB1YmxpYyByZXNvdXJjZTogYW55O1xyXG4gIHB1YmxpYyByZXNvdXJjZVVybD86IHN0cmluZztcclxuICBwdWJsaWMgZm9ybVVybDogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb3JtRm9ybWlvOiBGb3JtaW9Qcm9taXNlU2VydmljZTtcclxuICBwdWJsaWMgZm9ybWlvOiBGb3JtaW9Qcm9taXNlU2VydmljZTtcclxuICBwdWJsaWMgcmVmcmVzaDogRXZlbnRFbWl0dGVyPEZvcm1pb1JlZnJlc2hWYWx1ZT47XHJcblxyXG4gIHB1YmxpYyByZXNvdXJjZVJlc29sdmU6IGFueTtcclxuICBwdWJsaWMgcmVzb3VyY2VSZWplY3Q6IGFueTtcclxuICBwdWJsaWMgcmVzb3VyY2VMb2FkZWQ/OiBQcm9taXNlPGFueT47XHJcblxyXG4gIHB1YmxpYyByZXNvdXJjZUxvYWRpbmc/OiBQcm9taXNlPGFueT47XHJcbiAgcHVibGljIHJlc291cmNlSWQ/OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlc291cmNlczogYW55O1xyXG5cclxuICBwdWJsaWMgcmVhZHk/OiBQcm9taXNlPGFueT47XHJcbiAgcHVibGljIHJlYWR5UmVzb2x2ZTogYW55O1xyXG4gIHB1YmxpYyByZWFkeVJlamVjdDogYW55O1xyXG5cclxuICBwdWJsaWMgZm9ybUxvYWRpbmc/OiBQcm9taXNlPGFueT47XHJcbiAgcHVibGljIGZvcm1Mb2FkZWQ6IFByb21pc2U8YW55PjtcclxuICBwdWJsaWMgZm9ybVJlc29sdmU6IGFueTtcclxuICBwdWJsaWMgZm9ybVJlamVjdDogYW55O1xyXG4gIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGFwcENvbmZpZzogRm9ybWlvQXBwQ29uZmlnLFxyXG4gICAgcHVibGljIGNvbmZpZzogRm9ybWlvUmVzb3VyY2VDb25maWcsXHJcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgcmVzb3VyY2VzU2VydmljZTogRm9ybWlvUmVzb3VyY2VzXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmFsZXJ0cyA9IG5ldyBGb3JtaW9BbGVydHMoKTtcclxuICAgIHRoaXMucmVmcmVzaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ0Zvcm1pb1Jlc291cmNlU2VydmljZS5pbml0aWFsaXplKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4nKTtcclxuICB9XHJcblxyXG4gIHNldFJlc291cmNlKHJlc291cmNlSWQ6IGFueSkge1xyXG4gICAgdGhpcy5yZXNvdXJjZUxvYWRpbmcgPSBudWxsO1xyXG4gICAgdGhpcy5mb3JtTG9hZGluZyA9IG51bGw7XHJcbiAgICB0aGlzLnJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSwgcmVqZWN0OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5yZWFkeVJlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgICB0aGlzLnJlYWR5UmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZvcm1Mb2FkZWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmZvcm1SZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgdGhpcy5mb3JtUmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlc291cmNlTG9hZGVkID0gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSwgcmVqZWN0OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5yZXNvdXJjZVJlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgICB0aGlzLnJlc291cmNlUmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlc291cmNlSWQgPSByZXNvdXJjZUlkO1xyXG4gICAgdGhpcy5yZXNvdXJjZVVybCA9IHRoaXMuYXBwQ29uZmlnLmFwcFVybCArICcvJyArIHRoaXMuY29uZmlnLmZvcm07XHJcbiAgICBpZiAodGhpcy5yZXNvdXJjZUlkKSB7XHJcbiAgICAgIHRoaXMucmVzb3VyY2VVcmwgKz0gJy9zdWJtaXNzaW9uLycgKyB0aGlzLnJlc291cmNlSWQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5hcHBDb25maWcgJiYgdGhpcy5hcHBDb25maWcuYXBwVXJsKSB7XHJcbiAgICAgIEZvcm1pby5zZXRCYXNlVXJsKHRoaXMuYXBwQ29uZmlnLmFwaVVybCk7XHJcbiAgICAgIEZvcm1pby5zZXRQcm9qZWN0VXJsKHRoaXMuYXBwQ29uZmlnLmFwcFVybCk7XHJcbiAgICAgIEZvcm1pby5mb3JtT25seSA9IHRoaXMuYXBwQ29uZmlnLmZvcm1Pbmx5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcignWW91IG11c3QgcHJvdmlkZSBhbiBBcHBDb25maWcgd2l0aGluIHlvdXIgYXBwbGljYXRpb24hJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZvcm1pbyA9IG5ldyBGb3JtaW9Qcm9taXNlU2VydmljZSh0aGlzLnJlc291cmNlVXJsKTtcclxuICAgIHRoaXMucmVzb3VyY2UgPSB7IGRhdGE6IHt9IH07XHJcbiAgfVxyXG5cclxuICBpbml0KHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgY29uc3QgcmVzb3VyY2VJZCA9IHJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgIGlmIChyZXNvdXJjZUlkICYmIChyZXNvdXJjZUlkID09PSB0aGlzLnJlc291cmNlSWQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlYWR5O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCB0aGUgcmVzb3VyY2UuXHJcbiAgICB0aGlzLnNldFJlc291cmNlKHJlc291cmNlSWQpO1xyXG5cclxuICAgIC8vIEFkZCB0aGlzIHJlc291cmNlIHNlcnZpY2UgdG8gdGhlIGxpc3Qgb2YgYWxsIHJlc291cmNlcyBpbiBjb250ZXh0LlxyXG4gICAgaWYgKHRoaXMucmVzb3VyY2VzU2VydmljZSkge1xyXG4gICAgICB0aGlzLnJlc291cmNlcyA9IHRoaXMucmVzb3VyY2VzU2VydmljZS5yZXNvdXJjZXM7XHJcbiAgICAgIHRoaXMucmVzb3VyY2VzW3RoaXMuY29uZmlnLm5hbWVdID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yZXNvdXJjZUlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxvYWRGb3JtKClcclxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLmxvYWRSZXNvdXJjZSgpKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMucmVhZHlSZXNvbHZlKHRoaXMuZm9ybSkpXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHRoaXMucmVhZHlSZWplY3QoZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubG9hZEZvcm0oKVxyXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnJlYWR5UmVzb2x2ZSh0aGlzLmZvcm0pKVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4gdGhpcy5yZWFkeVJlamVjdChlcnIpKTtcclxuICB9XHJcblxyXG4gIG9uRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgdGhpcy5hbGVydHMuc2V0QWxlcnQoe1xyXG4gICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCBlcnJvclxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5yZXNvdXJjZXNTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMucmVzb3VyY2VzU2VydmljZS5lcnJvci5lbWl0KGVycm9yKTtcclxuICAgIH1cclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxuXHJcbiAgb25Gb3JtRXJyb3IoZXJyOiBhbnkpIHtcclxuICAgIHRoaXMuZm9ybVJlamVjdChlcnIpO1xyXG4gICAgdGhpcy5vbkVycm9yKGVycik7XHJcbiAgfVxyXG5cclxuICBsb2FkRm9ybSgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1Mb2FkaW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm1Mb2FkaW5nO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtVXJsID0gdGhpcy5hcHBDb25maWcuYXBwVXJsICsgJy8nICsgdGhpcy5jb25maWcuZm9ybTtcclxuICAgIHRoaXMuZm9ybUZvcm1pbyA9IG5ldyBGb3JtaW9Qcm9taXNlU2VydmljZSh0aGlzLmZvcm1VcmwpO1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5mb3JtTG9hZGluZyA9IHRoaXMuZm9ybUZvcm1pb1xyXG4gICAgICAubG9hZEZvcm0oKVxyXG4gICAgICAudGhlbihcclxuICAgICAgICAoZm9ybTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZvcm0gPSBmb3JtO1xyXG4gICAgICAgICAgdGhpcy5mb3JtUmVzb2x2ZShmb3JtKTtcclxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvYWRQYXJlbnRzKCk7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnI6IGFueSkgPT4gdGhpcy5vbkZvcm1FcnJvcihlcnIpXHJcbiAgICAgIClcclxuICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4gdGhpcy5vbkZvcm1FcnJvcihlcnIpKTtcclxuICAgIHJldHVybiB0aGlzLmZvcm1Mb2FkaW5nO1xyXG4gIH1cclxuXHJcbiAgbG9hZFBhcmVudHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLnBhcmVudHMgfHwgIXRoaXMuY29uZmlnLnBhcmVudHMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnJlc291cmNlc1NlcnZpY2UpIHtcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICdZb3UgbXVzdCBwcm92aWRlIHRoZSBGb3JtaW9SZXNvdXJjZXMgd2l0aGluIHlvdXIgYXBwbGljYXRpb24gdG8gdXNlIG5lc3RlZCByZXNvdXJjZXMuJ1xyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmZvcm1Mb2FkaW5nLnRoZW4oKGZvcm0pID0+IHtcclxuICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBsaXN0IG9mIHBhcmVudHMuXHJcbiAgICAgIGNvbnN0IF9wYXJlbnRzTG9hZGVkOiBBcnJheTxQcm9taXNlPGFueT4+ID0gW107XHJcbiAgICAgIHRoaXMuY29uZmlnLnBhcmVudHMuZm9yRWFjaCgocGFyZW50OiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCByZXNvdXJjZU5hbWUgPSBwYXJlbnQucmVzb3VyY2UgfHwgcGFyZW50O1xyXG4gICAgICAgIGNvbnN0IHJlc291cmNlRmllbGQgPSBwYXJlbnQuZmllbGQgfHwgcGFyZW50O1xyXG4gICAgICAgIGNvbnN0IGZpbHRlclJlc291cmNlID0gcGFyZW50Lmhhc093blByb3BlcnR5KCdmaWx0ZXInKSA/IHBhcmVudC5maWx0ZXIgOiB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlcy5oYXNPd25Qcm9wZXJ0eShyZXNvdXJjZU5hbWUpICYmIHRoaXMucmVzb3VyY2VzW3Jlc291cmNlTmFtZV0ucmVzb3VyY2VMb2FkZWQpIHtcclxuICAgICAgICAgIF9wYXJlbnRzTG9hZGVkLnB1c2goXHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzW3Jlc291cmNlTmFtZV0ucmVzb3VyY2VMb2FkZWQudGhlbigocmVzb3VyY2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBwYXJlbnRQYXRoID0gJyc7XHJcbiAgICAgICAgICAgICAgVXRpbHMuZWFjaENvbXBvbmVudChmb3JtLmNvbXBvbmVudHMsIChjb21wb25lbnQsIHBhdGgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQua2V5ID09PSByZXNvdXJjZUZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBjb21wb25lbnQuY2xlYXJPbkhpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgXy5zZXQodGhpcy5yZXNvdXJjZS5kYXRhLCBwYXRoLCByZXNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgIHBhcmVudFBhdGggPSBwYXRoO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogcGFyZW50UGF0aCxcclxuICAgICAgICAgICAgICAgIGZpbHRlcjogZmlsdGVyUmVzb3VyY2UsXHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBXaGVuIGFsbCB0aGUgcGFyZW50cyBoYXZlIGxvYWRlZCwgZW1pdCB0aGF0IHRvIHRoZSBvblBhcmVudHMgZW1pdHRlci5cclxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKF9wYXJlbnRzTG9hZGVkKS50aGVuKChwYXJlbnRzOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2guZW1pdCh7XHJcbiAgICAgICAgICBmb3JtOiBmb3JtLFxyXG4gICAgICAgICAgc3VibWlzc2lvbjogdGhpcy5yZXNvdXJjZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYXJlbnRzO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXNzaW9uRXJyb3IoZXJyOiBhbnkpIHtcclxuICAgIHRoaXMub25FcnJvcihlcnIpO1xyXG4gICAgdGhpcy5yZXNvdXJjZVJlamVjdChlcnIpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFJlc291cmNlKCkge1xyXG4gICAgaWYgKHRoaXMucmVzb3VyY2VMb2FkaW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlc291cmNlTG9hZGluZztcclxuICAgIH1cclxuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMucmVzb3VyY2VMb2FkaW5nID0gdGhpcy5mb3JtaW9cclxuICAgICAgLmxvYWRTdWJtaXNzaW9uKG51bGwsIHtpZ25vcmVDYWNoZTogdHJ1ZX0pXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChyZXNvdXJjZTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlc291cmNlID0gcmVzb3VyY2U7XHJcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoLmVtaXQoe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ3N1Ym1pc3Npb24nLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5yZXNvdXJjZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnJlc291cmNlUmVzb2x2ZShyZXNvdXJjZSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyOiBhbnkpID0+IHRoaXMub25TdWJtaXNzaW9uRXJyb3IoZXJyKVxyXG4gICAgICApXHJcbiAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHRoaXMub25TdWJtaXNzaW9uRXJyb3IoZXJyKSk7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUxvYWRpbmc7XHJcbiAgfVxyXG5cclxuICBzYXZlKHJlc291cmNlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZvcm1pbyA9IHJlc291cmNlLl9pZCA/IHRoaXMuZm9ybWlvIDogdGhpcy5mb3JtRm9ybWlvO1xyXG4gICAgcmV0dXJuIGZvcm1pb1xyXG4gICAgICAuc2F2ZVN1Ym1pc3Npb24ocmVzb3VyY2UpXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChzYXZlZDogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlc291cmNlID0gc2F2ZWQ7XHJcbiAgICAgICAgICByZXR1cm4gc2F2ZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyOiBhbnkpID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICAgIClcclxuICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4gdGhpcy5vbkVycm9yKGVycikpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWlvXHJcbiAgICAgIC5kZWxldGVTdWJtaXNzaW9uKClcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyOiBhbnkpID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICAgIClcclxuICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4gdGhpcy5vbkVycm9yKGVycikpO1xyXG4gIH1cclxufVxyXG4iXX0=