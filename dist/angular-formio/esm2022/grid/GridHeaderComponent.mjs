import { Output, EventEmitter, ViewChild, TemplateRef, Input, Component } from '@angular/core';
import * as i0 from "@angular/core";
class GridHeaderComponent {
    actionAllowed;
    sort;
    template;
    headers;
    constructor() {
        this.headers = [];
        this.sort = new EventEmitter();
    }
    get numHeaders() {
        return this.headers.length;
    }
    load(formio, query, columns) {
        return Promise.resolve([]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GridHeaderComponent, selector: "ng-component", inputs: { actionAllowed: "actionAllowed" }, outputs: { sort: "sort" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
}
export { GridHeaderComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { actionAllowed: [{
                type: Input
            }], sort: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEhlYWRlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL0dyaWRIZWFkZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUkvRixNQUdhLG1CQUFtQjtJQUNyQixhQUFhLENBQU07SUFDbEIsSUFBSSxDQUEyQjtJQUNELFFBQVEsQ0FBbUI7SUFDNUQsT0FBTyxDQUFvQjtJQUNsQztRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQTRCLEVBQUUsS0FBVyxFQUFFLE9BQW9CO1FBQ2xFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO3VHQWhCVSxtQkFBbUI7MkZBQW5CLG1CQUFtQixxS0FHbkIsV0FBVyw4REFMWixFQUFFOztTQUVELG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUgvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxFQUFFO2lCQUNiOzBFQUVVLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksSUFBSTtzQkFBYixNQUFNO2dCQUNpQyxRQUFRO3NCQUEvQyxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgSW5wdXQsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1pb1Byb21pc2VTZXJ2aWNlfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQge0dyaWRIZWFkZXJ9IGZyb20gJy4vdHlwZXMvZ3JpZC1oZWFkZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGU6ICcnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkSGVhZGVyQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBhY3Rpb25BbGxvd2VkOiBhbnk7XHJcbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxHcmlkSGVhZGVyPjtcclxuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiB0cnVlfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgcHVibGljIGhlYWRlcnM6IEFycmF5PEdyaWRIZWFkZXI+O1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5oZWFkZXJzID0gW107XHJcbiAgICB0aGlzLnNvcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbnVtSGVhZGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLmhlYWRlcnMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgbG9hZChmb3JtaW86IEZvcm1pb1Byb21pc2VTZXJ2aWNlLCBxdWVyeT86IGFueSwgY29sdW1ucz86IEFycmF5PGFueT4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==