import { Component } from '@angular/core';
import { GridHeaderComponent } from '../GridHeaderComponent';
import { SortType } from '../types/grid-header';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class FormGridHeaderComponent extends GridHeaderComponent {
    header;
    load(formio) {
        this.header = {
            label: 'Title',
            key: 'title',
            sort: SortType.ASC
        };
        this.headers = [this.header];
        return Promise.resolve(this.headers);
    }
    get numHeaders() {
        return 2;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridHeaderComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormGridHeaderComponent, selector: "form-grid-header", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-9\">\r\n            <a (click)=\"sort.emit(header)\" style=\"cursor: pointer\">\r\n              {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n            </a>\r\n          </div>\r\n          <div class=\"col-sm-3 d-flex justify-content-end\">\r\n            Operations\r\n          </div>\r\n        </div>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
export { FormGridHeaderComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormGridHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-grid-header', template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-9\">\r\n            <a (click)=\"sort.emit(header)\" style=\"cursor: pointer\">\r\n              {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n            </a>\r\n          </div>\r\n          <div class=\"col-sm-3 d-flex justify-content-end\">\r\n            Operations\r\n          </div>\r\n        </div>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUdyaWRIZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vZ3JpZC9zcmMvZm9ybS9Gb3JtR3JpZEhlYWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9mb3JtL0Zvcm1HcmlkSGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFhLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7QUFFMUQsTUFJYSx1QkFBd0IsU0FBUSxtQkFBbUI7SUFDdkQsTUFBTSxDQUFhO0lBQzFCLElBQUksQ0FBQyxNQUFZO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLEtBQUssRUFBRSxPQUFPO1lBQ2QsR0FBRyxFQUFFLE9BQU87WUFDWixJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUc7U0FDbkIsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO3VHQWRVLHVCQUF1QjsyRkFBdkIsdUJBQXVCLCtFQ1JwQyx3b0JBa0JBOztTRFZhLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQUpuQyxTQUFTOytCQUNFLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtHcmlkSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuLi9HcmlkSGVhZGVyQ29tcG9uZW50JztcclxuaW1wb3J0IHtHcmlkSGVhZGVyLCBTb3J0VHlwZX0gZnJvbSAnLi4vdHlwZXMvZ3JpZC1oZWFkZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmb3JtLWdyaWQtaGVhZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vRm9ybUdyaWRIZWFkZXIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtR3JpZEhlYWRlckNvbXBvbmVudCBleHRlbmRzIEdyaWRIZWFkZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBoZWFkZXI6IEdyaWRIZWFkZXI7XHJcbiAgbG9hZChmb3JtaW8/OiBhbnkpIHtcclxuICAgIHRoaXMuaGVhZGVyID0ge1xyXG4gICAgICBsYWJlbDogJ1RpdGxlJyxcclxuICAgICAga2V5OiAndGl0bGUnLFxyXG4gICAgICBzb3J0OiBTb3J0VHlwZS5BU0NcclxuICAgIH07XHJcbiAgICB0aGlzLmhlYWRlcnMgPSBbdGhpcy5oZWFkZXJdO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmhlYWRlcnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG51bUhlYWRlcnMoKSB7XHJcbiAgICByZXR1cm4gMjtcclxuICB9XHJcbn1cclxuIiwiPG5nLXRlbXBsYXRlPlxyXG4gIDx0aGVhZD5cclxuICAgIDx0cj5cclxuICAgICAgPHRoPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOVwiPlxyXG4gICAgICAgICAgICA8YSAoY2xpY2spPVwic29ydC5lbWl0KGhlYWRlcilcIiBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiPlxyXG4gICAgICAgICAgICAgIHt7IGhlYWRlci5sYWJlbCB9fSZuYnNwOzxzcGFuIFtuZ0NsYXNzXT1cInsnZmEtY2FyZXQtdXAgYmktY2FyZXQtdXAnOiAoaGVhZGVyLnNvcnQgPT09ICdhc2MnKSwgJ2ZhLWNhcmV0LWRvd24gYmktY2FyZXQtZG93bic6IChoZWFkZXIuc29ydCA9PT0gJ2Rlc2MnKX1cIiBjbGFzcz1cImZhIGJpXCIgKm5nSWY9XCJoZWFkZXIuc29ydFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmRcIj5cclxuICAgICAgICAgICAgT3BlcmF0aW9uc1xyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvdGg+XHJcbiAgICA8L3RyPlxyXG4gIDwvdGhlYWQ+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==