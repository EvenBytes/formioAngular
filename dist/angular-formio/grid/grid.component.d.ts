import { GridFooterPositions } from './types/grid-footer-positions';
import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, EventEmitter, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormioAlerts } from '@formio/angular';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridBodyComponent } from './GridBodyComponent';
import { GridFooterComponent } from './GridFooterComponent';
import { FormioPromiseService } from '@formio/angular';
import { GridColumn } from './types/grid-column';
import { GridHeader } from './types/grid-header';
import * as i0 from "@angular/core";
export declare class FormioGridComponent implements OnChanges, OnInit, AfterViewInit {
    alerts: FormioAlerts;
    private resolver;
    private ref;
    footerPosition: GridFooterPositions;
    src?: string;
    items?: Array<any>;
    onForm?: Promise<any>;
    query?: any;
    refresh?: EventEmitter<object>;
    columns?: Array<GridColumn>;
    gridType?: string;
    size?: number;
    components?: any;
    formio?: FormioPromiseService;
    label?: string;
    createText: String;
    isActionAllowed: any;
    select: EventEmitter<object>;
    rowSelect: EventEmitter<object>;
    rowAction: EventEmitter<object>;
    createItem: EventEmitter<any>;
    error: EventEmitter<any>;
    headerElement: ViewContainerRef;
    bodyElement: ViewContainerRef;
    footerElement: ViewContainerRef;
    page: number;
    isLoading: boolean;
    initialized: boolean;
    header: GridHeaderComponent;
    body: GridBodyComponent;
    footer: GridFooterComponent;
    footerPositions: typeof GridFooterPositions;
    constructor(alerts: FormioAlerts, resolver: ComponentFactoryResolver, ref: ChangeDetectorRef);
    createComponent(property: any, component: any): any;
    loadGrid(src?: string): void;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    actionAllowed(action: any): any;
    onError(error: any): void;
    refreshGrid(query?: any): any;
    setPage(num?: number): void;
    sortColumn(header: GridHeader): void;
    pageChanged(page: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioGridComponent, "formio-grid", never, { "footerPosition": { "alias": "footerPosition"; "required": false; }; "src": { "alias": "src"; "required": false; }; "items": { "alias": "items"; "required": false; }; "onForm": { "alias": "onForm"; "required": false; }; "query": { "alias": "query"; "required": false; }; "refresh": { "alias": "refresh"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "gridType": { "alias": "gridType"; "required": false; }; "size": { "alias": "size"; "required": false; }; "components": { "alias": "components"; "required": false; }; "formio": { "alias": "formio"; "required": false; }; "label": { "alias": "label"; "required": false; }; "createText": { "alias": "createText"; "required": false; }; "isActionAllowed": { "alias": "isActionAllowed"; "required": false; }; }, { "select": "select"; "rowSelect": "rowSelect"; "rowAction": "rowAction"; "createItem": "createItem"; "error": "error"; }, never, never, false, never>;
}
//# sourceMappingURL=grid.component.d.ts.map