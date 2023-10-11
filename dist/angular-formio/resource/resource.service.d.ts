import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioResourceConfig } from './resource.config';
import { FormioResources } from './resources.service';
import { FormioPromiseService } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import { FormioAppConfig } from '@formio/angular';
import { FormioRefreshValue } from '@formio/angular';
import * as i0 from "@angular/core";
export declare class FormioResourceService {
    appConfig: FormioAppConfig;
    config: FormioResourceConfig;
    resourcesService: FormioResources;
    initialized: boolean;
    form: any;
    alerts: FormioAlerts;
    resource: any;
    resourceUrl?: string;
    formUrl: string;
    formFormio: FormioPromiseService;
    formio: FormioPromiseService;
    refresh: EventEmitter<FormioRefreshValue>;
    resourceResolve: any;
    resourceReject: any;
    resourceLoaded?: Promise<any>;
    resourceLoading?: Promise<any>;
    resourceId?: string;
    resources: any;
    ready?: Promise<any>;
    readyResolve: any;
    readyReject: any;
    formLoading?: Promise<any>;
    formLoaded: Promise<any>;
    formResolve: any;
    formReject: any;
    isLoading: boolean;
    constructor(appConfig: FormioAppConfig, config: FormioResourceConfig, resourcesService: FormioResources);
    initialize(): void;
    setResource(resourceId: any): void;
    init(route: ActivatedRoute): Promise<any>;
    onError(error: any): void;
    onFormError(err: any): void;
    loadForm(): Promise<any>;
    loadParents(): Promise<any>;
    onSubmissionError(err: any): void;
    loadResource(): Promise<any>;
    save(resource: any): Promise<any>;
    remove(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioResourceService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormioResourceService>;
}
//# sourceMappingURL=resource.service.d.ts.map