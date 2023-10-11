import { Component } from '@angular/core';
import { Utils, Components } from '@formio/js';
import { GridHeaderComponent } from '../GridHeaderComponent';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class SubmissionGridHeaderComponent extends GridHeaderComponent {
    // Map structure where the key is the path and the value is the component
    formComponents;
    load(formio, query, columns) {
        query = query || {};
        return formio.loadForm({ params: query }).then((form) => {
            this.headers = [];
            this.formComponents = new Map();
            this.setComponents(form.components);
            columns ? columns.forEach(column => {
                this.setHeader(this.getHeaderForColumn(column, this.formComponents.get(column.path)));
            }) : this.setComponentsHeaders(this.formComponents);
            return this.headers;
        });
    }
    setHeader(header) {
        this.headers.push(header);
    }
    getHeaderForColumn(column, component, sort) {
        return {
            label: column.label,
            key: column.path,
            sort: sort,
            component: component ? Components.create(component, null, null, true) : undefined,
            renderCell: column ? column.renderCell : undefined
        };
    }
    getHeaderForComponent(component, path, sort) {
        return {
            label: component.label,
            key: path,
            sort: sort,
            component: component ? Components.create(component, null, null, true) : undefined,
        };
    }
    // Set headers from components in case if columns are not provided
    setComponentsHeaders(components, sort) {
        components.forEach((component, path) => {
            if (component.input &&
                (!component.hasOwnProperty('tableView') || component.tableView)) {
                this.setHeader(this.getHeaderForComponent(component, path, sort));
            }
        });
    }
    // Map components
    setComponents(components) {
        Utils.eachComponent(components, (component, newPath) => {
            this.formComponents.set(`data.${newPath}`, component);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridHeaderComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionGridHeaderComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let header of headers\">\r\n        <a (click)=\"sort.emit(header)\">\r\n          {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n        </a>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
export { SubmissionGridHeaderComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridHeaderComponent, decorators: [{
            type: Component,
            args: [{ template: "<ng-template>\r\n  <thead>\r\n    <tr>\r\n      <th *ngFor=\"let header of headers\">\r\n        <a (click)=\"sort.emit(header)\">\r\n          {{ header.label }}&nbsp;<span [ngClass]=\"{'fa-caret-up bi-caret-up': (header.sort === 'asc'), 'fa-caret-down bi-caret-down': (header.sort === 'desc')}\" class=\"fa bi\" *ngIf=\"header.sort\"></span>\r\n        </a>\r\n      </th>\r\n    </tr>\r\n  </thead>\r\n</ng-template>\r\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VibWlzc2lvbkdyaWRIZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vZ3JpZC9zcmMvc3VibWlzc2lvbi9TdWJtaXNzaW9uR3JpZEhlYWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9zdWJtaXNzaW9uL1N1Ym1pc3Npb25HcmlkSGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQTBCLE1BQU0sWUFBWSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7QUFNM0QsTUFHYSw2QkFBOEIsU0FBUSxtQkFBbUI7SUFFcEUseUVBQXlFO0lBQ3pFLGNBQWMsQ0FBdUM7SUFFckQsSUFBSSxDQUFDLE1BQTRCLEVBQUUsS0FBVyxFQUFFLE9BQTJCO1FBQ3pFLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRTtZQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxFQUFtQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFdEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFrQjtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBa0IsRUFBRSxTQUFtQyxFQUFFLElBQWU7UUFDekYsT0FBTztZQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDaEIsSUFBSSxFQUFFLElBQUk7WUFDVixTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUN0RyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ25ELENBQUM7SUFDSixDQUFDO0lBRUQscUJBQXFCLENBQUMsU0FBa0MsRUFBRSxJQUFZLEVBQUUsSUFBZTtRQUNyRixPQUFPO1lBQ0wsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO1lBQ3RCLEdBQUcsRUFBRSxJQUFJO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUN2RyxDQUFDO0lBQ0osQ0FBQztJQUNELGtFQUFrRTtJQUNsRSxvQkFBb0IsQ0FBQyxVQUFnRCxFQUFFLElBQWU7UUFDcEYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNyQyxJQUNFLFNBQVMsQ0FBQyxLQUFLO2dCQUNmLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFDL0Q7Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLGFBQWEsQ0FBQyxVQUFVO1FBQ3RCLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBa0MsRUFBRSxPQUFlLEVBQUUsRUFBRTtZQUN0RixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt1R0ExRFUsNkJBQTZCOzJGQUE3Qiw2QkFBNkIsMkVDWDFDLHlhQVdBOztTREFhLDZCQUE2QjsyRkFBN0IsNkJBQTZCO2tCQUh6QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7VXRpbHMsIENvbXBvbmVudHMsIEV4dGVuZGVkQ29tcG9uZW50U2NoZW1hfSBmcm9tICdAZm9ybWlvL2pzJztcclxuaW1wb3J0IHtHcmlkSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuLi9HcmlkSGVhZGVyQ29tcG9uZW50JztcclxuaW1wb3J0IHtGb3JtaW9Qcm9taXNlU2VydmljZX0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHtDb21wb25lbnRJbnN0YW5jZSwgRm9ybWlvRm9ybX0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHtHcmlkQ29sdW1ufSBmcm9tICcuLi90eXBlcy9ncmlkLWNvbHVtbic7XHJcbmltcG9ydCB7R3JpZEhlYWRlciwgU29ydFR5cGV9IGZyb20gJy4uL3R5cGVzL2dyaWQtaGVhZGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi9TdWJtaXNzaW9uR3JpZEhlYWRlci5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFN1Ym1pc3Npb25HcmlkSGVhZGVyQ29tcG9uZW50IGV4dGVuZHMgR3JpZEhlYWRlckNvbXBvbmVudCB7XHJcblxyXG4gIC8vIE1hcCBzdHJ1Y3R1cmUgd2hlcmUgdGhlIGtleSBpcyB0aGUgcGF0aCBhbmQgdGhlIHZhbHVlIGlzIHRoZSBjb21wb25lbnRcclxuICBmb3JtQ29tcG9uZW50czogTWFwPHN0cmluZywgRXh0ZW5kZWRDb21wb25lbnRTY2hlbWE+O1xyXG5cclxuICBsb2FkKGZvcm1pbzogRm9ybWlvUHJvbWlzZVNlcnZpY2UsIHF1ZXJ5PzogYW55LCBjb2x1bW5zPzogQXJyYXk8R3JpZENvbHVtbj4pIHtcclxuICAgIHF1ZXJ5ID0gcXVlcnkgfHwge307XHJcbiAgICByZXR1cm4gZm9ybWlvLmxvYWRGb3JtKHtwYXJhbXM6IHF1ZXJ5fSkudGhlbigoZm9ybTogRm9ybWlvRm9ybSkgPT4ge1xyXG4gICAgICB0aGlzLmhlYWRlcnMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JtQ29tcG9uZW50cyA9IG5ldyBNYXA8c3RyaW5nLCBFeHRlbmRlZENvbXBvbmVudFNjaGVtYT4oKTtcclxuICAgICAgdGhpcy5zZXRDb21wb25lbnRzKGZvcm0uY29tcG9uZW50cyk7XHJcbiAgICAgIGNvbHVtbnMgPyBjb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcclxuICAgICAgICAgIHRoaXMuc2V0SGVhZGVyKHRoaXMuZ2V0SGVhZGVyRm9yQ29sdW1uKGNvbHVtbiwgdGhpcy5mb3JtQ29tcG9uZW50cy5nZXQoY29sdW1uLnBhdGgpKSk7XHJcbiAgICAgICAgfSkgOiB0aGlzLnNldENvbXBvbmVudHNIZWFkZXJzKHRoaXMuZm9ybUNvbXBvbmVudHMpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuaGVhZGVycztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SGVhZGVyKGhlYWRlcjogR3JpZEhlYWRlcikge1xyXG4gICAgdGhpcy5oZWFkZXJzLnB1c2goaGVhZGVyKTtcclxuICB9XHJcblxyXG4gIGdldEhlYWRlckZvckNvbHVtbihjb2x1bW46IEdyaWRDb2x1bW4sIGNvbXBvbmVudD86IEV4dGVuZGVkQ29tcG9uZW50U2NoZW1hLCBzb3J0PzogU29ydFR5cGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxhYmVsOiBjb2x1bW4ubGFiZWwsXHJcbiAgICAgIGtleTogY29sdW1uLnBhdGgsXHJcbiAgICAgIHNvcnQ6IHNvcnQsXHJcbiAgICAgIGNvbXBvbmVudDogY29tcG9uZW50ID8gQ29tcG9uZW50cy5jcmVhdGUoY29tcG9uZW50LCBudWxsLCBudWxsLCB0cnVlKSBhcyBDb21wb25lbnRJbnN0YW5jZSA6IHVuZGVmaW5lZCxcclxuICAgICAgcmVuZGVyQ2VsbDogY29sdW1uID8gY29sdW1uLnJlbmRlckNlbGwgOiB1bmRlZmluZWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRIZWFkZXJGb3JDb21wb25lbnQoY29tcG9uZW50OiBFeHRlbmRlZENvbXBvbmVudFNjaGVtYSwgcGF0aDogc3RyaW5nLCBzb3J0PzogU29ydFR5cGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxhYmVsOiBjb21wb25lbnQubGFiZWwsXHJcbiAgICAgIGtleTogcGF0aCxcclxuICAgICAgc29ydDogc29ydCxcclxuICAgICAgY29tcG9uZW50OiBjb21wb25lbnQgPyBDb21wb25lbnRzLmNyZWF0ZShjb21wb25lbnQsIG51bGwsIG51bGwsIHRydWUpIGFzIENvbXBvbmVudEluc3RhbmNlIDogdW5kZWZpbmVkLFxyXG4gICAgfTtcclxuICB9XHJcbiAgLy8gU2V0IGhlYWRlcnMgZnJvbSBjb21wb25lbnRzIGluIGNhc2UgaWYgY29sdW1ucyBhcmUgbm90IHByb3ZpZGVkXHJcbiAgc2V0Q29tcG9uZW50c0hlYWRlcnMoY29tcG9uZW50czogTWFwPHN0cmluZywgRXh0ZW5kZWRDb21wb25lbnRTY2hlbWE+LCBzb3J0PzogU29ydFR5cGUpIHtcclxuICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50LCBwYXRoKSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBjb21wb25lbnQuaW5wdXQgJiZcclxuICAgICAgICAoIWNvbXBvbmVudC5oYXNPd25Qcm9wZXJ0eSgndGFibGVWaWV3JykgfHwgY29tcG9uZW50LnRhYmxlVmlldylcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5zZXRIZWFkZXIodGhpcy5nZXRIZWFkZXJGb3JDb21wb25lbnQoY29tcG9uZW50LCBwYXRoLCBzb3J0KSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gTWFwIGNvbXBvbmVudHNcclxuICBzZXRDb21wb25lbnRzKGNvbXBvbmVudHMpIHtcclxuICAgIFV0aWxzLmVhY2hDb21wb25lbnQoY29tcG9uZW50cywgKGNvbXBvbmVudDogRXh0ZW5kZWRDb21wb25lbnRTY2hlbWEsIG5ld1BhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICB0aGlzLmZvcm1Db21wb25lbnRzLnNldChgZGF0YS4ke25ld1BhdGh9YCwgY29tcG9uZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuIiwiPG5nLXRlbXBsYXRlPlxyXG4gIDx0aGVhZD5cclxuICAgIDx0cj5cclxuICAgICAgPHRoICpuZ0Zvcj1cImxldCBoZWFkZXIgb2YgaGVhZGVyc1wiPlxyXG4gICAgICAgIDxhIChjbGljayk9XCJzb3J0LmVtaXQoaGVhZGVyKVwiPlxyXG4gICAgICAgICAge3sgaGVhZGVyLmxhYmVsIH19Jm5ic3A7PHNwYW4gW25nQ2xhc3NdPVwieydmYS1jYXJldC11cCBiaS1jYXJldC11cCc6IChoZWFkZXIuc29ydCA9PT0gJ2FzYycpLCAnZmEtY2FyZXQtZG93biBiaS1jYXJldC1kb3duJzogKGhlYWRlci5zb3J0ID09PSAnZGVzYycpfVwiIGNsYXNzPVwiZmEgYmlcIiAqbmdJZj1cImhlYWRlci5zb3J0XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC90aD5cclxuICAgIDwvdHI+XHJcbiAgPC90aGVhZD5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19