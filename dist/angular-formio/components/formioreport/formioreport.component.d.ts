import { OnInit, OnChanges, ElementRef, EventEmitter } from '@angular/core';
import { FormioComponent } from '../formio/formio.component';
import { FormioReport } from '../../formio.common';
import * as i0 from "@angular/core";
export declare class FormioReportComponent extends FormioComponent implements OnInit, OnChanges {
    report?: FormioReport;
    projectEndpoint?: string;
    fetchDataError: EventEmitter<any>;
    formioElement?: ElementRef<any>;
    setFormFromSrc(): void;
    setFormUrl(url: any): void;
    ngOnChanges(changes: any): void;
    getRendererOptions(): any;
    createRenderer(): any;
    attachFormEvents(): void;
    getRenderer(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioReportComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioReportComponent, "formio-report", never, { "report": { "alias": "report"; "required": false; }; "projectEndpoint": { "alias": "projectEndpoint"; "required": false; }; }, { "fetchDataError": "fetchDataError"; }, never, never, false, never>;
}
//# sourceMappingURL=formioreport.component.d.ts.map