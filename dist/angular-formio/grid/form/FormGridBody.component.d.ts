import { ElementRef, OnDestroy } from '@angular/core';
import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '@formio/angular';
import { Tooltip } from 'bootstrap';
import * as i0 from "@angular/core";
export declare class FormGridBodyComponent extends GridBodyComponent implements OnDestroy {
    createBtns: ElementRef[];
    viewBtns: ElementRef[];
    editBtns: ElementRef[];
    permissionsBtns: ElementRef[];
    deleteBtns: ElementRef[];
    tooltips: Array<Tooltip>;
    load(formio: FormioPromiseService, query?: any): Promise<void>;
    attachTooltips(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormGridBodyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormGridBodyComponent, "form-grid-body", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=FormGridBody.component.d.ts.map