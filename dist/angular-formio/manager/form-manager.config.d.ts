import * as i0 from "@angular/core";
export interface FormManagerRouteConfig {
    formIndex?: any;
    formCreate?: any;
    form?: any;
    formView?: any;
    formEdit?: any;
    formEmbed?: any;
    formDelete?: any;
    submissionIndex?: any;
    submission?: any;
    submissionView?: any;
    submissionEdit?: any;
    submissionDelete?: any;
}
export declare class FormManagerConfig {
    tag: string;
    includeSearch: boolean;
    saveDraft: boolean;
    type: string;
    builder?: any;
    viewer?: string;
    renderer: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormManagerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormManagerConfig>;
}
export declare const DefaultConfiguration: FormManagerConfig;
//# sourceMappingURL=form-manager.config.d.ts.map