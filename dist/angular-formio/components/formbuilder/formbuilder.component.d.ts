import { OnInit, OnChanges, OnDestroy, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import { FormioForm, FormioOptions } from '../../formio.common';
import { FormBuilder } from '@formio/js';
import { Observable } from 'rxjs';
import { CustomTagsService } from '../../custom-component/custom-tags.service';
import * as i0 from "@angular/core";
export declare class FormBuilderComponent implements OnInit, OnChanges, OnDestroy {
    private ngZone;
    private config;
    private customTags?;
    ready: Promise<object>;
    readyResolve: any;
    formio: any;
    builder: FormBuilder;
    componentAdding: boolean;
    private refreshSubscription;
    form?: FormioForm;
    options?: FormioOptions;
    formbuilder?: any;
    noeval?: boolean;
    refresh?: Observable<void>;
    rebuild?: Observable<object>;
    change: EventEmitter<object>;
    builderElement?: ElementRef<any>;
    constructor(ngZone: NgZone, config: FormioAppConfig, customTags?: CustomTagsService);
    ngOnInit(): void;
    setInstance(instance: any): any;
    setDisplay(display: String, prevDisplay?: string): void;
    buildForm(form: any, prevForm?: any): any;
    rebuildForm(form: any, options?: object): Promise<any>;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormBuilderComponent, [null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormBuilderComponent, "form-builder", never, { "form": { "alias": "form"; "required": false; }; "options": { "alias": "options"; "required": false; }; "formbuilder": { "alias": "formbuilder"; "required": false; }; "noeval": { "alias": "noeval"; "required": false; }; "refresh": { "alias": "refresh"; "required": false; }; "rebuild": { "alias": "rebuild"; "required": false; }; }, { "change": "change"; }, never, never, false, never>;
}
//# sourceMappingURL=formbuilder.component.d.ts.map