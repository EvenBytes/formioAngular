import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from '@formio/angular/auth';
import { FormioResourceService } from './resource.service';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class FormioResourceComponent implements OnInit, OnDestroy {
    service: FormioResourceService;
    route: ActivatedRoute;
    auth: FormioAuthService;
    router: Router;
    perms: {
        delete: boolean;
        edit: boolean;
    };
    routerSubscription: Subscription;
    constructor(service: FormioResourceService, route: ActivatedRoute, auth: FormioAuthService, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    init(): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioResourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioResourceComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=resource.component.d.ts.map