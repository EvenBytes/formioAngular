import { Input, Output, EventEmitter, ViewChild, TemplateRef, Component } from '@angular/core';
import { each, clone } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "./grid.service";
class GridBodyComponent {
    service;
    header;
    actionAllowed;
    rowSelect;
    rowAction;
    template;
    rows;
    loading;
    firstItem = 0;
    lastItem = 0;
    skip = 0;
    limit = 0;
    total = 0;
    constructor(service) {
        this.service = service;
        this.rowSelect = new EventEmitter();
        this.rowAction = new EventEmitter();
        this.loading = true;
    }
    load(formio, query) {
        return formio.loadForm(query);
    }
    onRowSelect(event, row) {
        event.preventDefault();
        this.rowSelect.emit(row);
    }
    onRowAction(event, row, action) {
        event.preventDefault();
        this.rowAction.emit({ row, action });
    }
    /**
     * Set the rows for this Grid body.
     *
     * @param query
     * @param items
     * @return any
     */
    setRows(query, items) {
        this.rows = [];
        if (typeof items !== 'object') {
            this.firstItem = 0;
            this.lastItem = 0;
            this.total = 0;
            this.skip = 0;
            this.loading = false;
            this.service.setRows(this.rows);
            return this.rows;
        }
        this.firstItem = query.skip + 1;
        this.lastItem = this.firstItem + items.length - 1;
        if (this.lastItem === 0) {
            this.firstItem = 0;
        }
        this.total = items.serverCount;
        this.limit = query.limit;
        this.skip = Math.floor(items.skip / query.limit) + 1;
        this.loading = false;
        each(items, (item) => {
            this.rows.push(clone(item));
        });
        this.service.setRows(this.rows);
        return this.rows;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridBodyComponent, deps: [{ token: i1.GridService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GridBodyComponent, selector: "ng-component", inputs: { header: "header", actionAllowed: "actionAllowed" }, outputs: { rowSelect: "rowSelect", rowAction: "rowAction" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: '', isInline: true });
}
export { GridBodyComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridBodyComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i1.GridService }]; }, propDecorators: { header: [{
                type: Input
            }], actionAllowed: [{
                type: Input
            }], rowSelect: [{
                type: Output
            }], rowAction: [{
                type: Output
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEJvZHlDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9HcmlkQm9keUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7OztBQUtyQyxNQUdhLGlCQUFpQjtJQWFUO0lBWlYsTUFBTSxDQUFzQjtJQUM1QixhQUFhLENBQU07SUFDbEIsU0FBUyxDQUFvQjtJQUM3QixTQUFTLENBQW9CO0lBQ0MsUUFBUSxDQUFtQjtJQUM1RCxJQUFJLENBQWE7SUFDakIsT0FBTyxDQUFVO0lBQ2pCLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNULEtBQUssR0FBRyxDQUFDLENBQUM7SUFDVixLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLFlBQW1CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQTRCLEVBQUUsS0FBVztRQUM1QyxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRztRQUNwQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU07UUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE9BQU8sQ0FBQyxLQUFVLEVBQUUsS0FBVTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVmLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7dUdBckVVLGlCQUFpQjsyRkFBakIsaUJBQWlCLHlOQUtqQixXQUFXLDhEQVBaLEVBQUU7O1NBRUQsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBSDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7a0dBRVUsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUNpQyxRQUFRO3NCQUEvQyxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBlYWNoLCBjbG9uZSB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IEdyaWRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL0dyaWRIZWFkZXJDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkU2VydmljZSB9IGZyb20gJy4vZ3JpZC5zZXJ2aWNlJztcclxuaW1wb3J0IHtGb3JtaW9Qcm9taXNlU2VydmljZX0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlOiAnJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZEJvZHlDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGhlYWRlcjogR3JpZEhlYWRlckNvbXBvbmVudDtcclxuICBASW5wdXQoKSBhY3Rpb25BbGxvd2VkOiBhbnk7XHJcbiAgQE91dHB1dCgpIHJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQE91dHB1dCgpIHJvd0FjdGlvbjogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIHB1YmxpYyByb3dzOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBsb2FkaW5nOiBCb29sZWFuO1xyXG4gIHB1YmxpYyBmaXJzdEl0ZW0gPSAwO1xyXG4gIHB1YmxpYyBsYXN0SXRlbSA9IDA7XHJcbiAgcHVibGljIHNraXAgPSAwO1xyXG4gIHB1YmxpYyBsaW1pdCA9IDA7XHJcbiAgcHVibGljIHRvdGFsID0gMDtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VydmljZTogR3JpZFNlcnZpY2UpIHtcclxuICAgIHRoaXMucm93U2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5yb3dBY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbG9hZChmb3JtaW86IEZvcm1pb1Byb21pc2VTZXJ2aWNlLCBxdWVyeT86IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gZm9ybWlvLmxvYWRGb3JtKHF1ZXJ5KTtcclxuICB9XHJcblxyXG4gIG9uUm93U2VsZWN0KGV2ZW50LCByb3cpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnJvd1NlbGVjdC5lbWl0KHJvdyk7XHJcbiAgfVxyXG5cclxuICBvblJvd0FjdGlvbihldmVudCwgcm93LCBhY3Rpb24pIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnJvd0FjdGlvbi5lbWl0KHsgcm93LCBhY3Rpb24gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHJvd3MgZm9yIHRoaXMgR3JpZCBib2R5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHF1ZXJ5XHJcbiAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICogQHJldHVybiBhbnlcclxuICAgKi9cclxuICBzZXRSb3dzKHF1ZXJ5OiBhbnksIGl0ZW1zOiBhbnkpIHtcclxuICAgIHRoaXMucm93cyA9IFtdO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaXRlbXMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuZmlyc3RJdGVtID0gMDtcclxuICAgICAgdGhpcy5sYXN0SXRlbSA9IDA7XHJcbiAgICAgIHRoaXMudG90YWwgPSAwO1xyXG4gICAgICB0aGlzLnNraXAgPSAwO1xyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zZXJ2aWNlLnNldFJvd3ModGhpcy5yb3dzKTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzLnJvd3M7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maXJzdEl0ZW0gPSBxdWVyeS5za2lwICsgMTtcclxuICAgIHRoaXMubGFzdEl0ZW0gPSB0aGlzLmZpcnN0SXRlbSArIGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICBpZiAodGhpcy5sYXN0SXRlbSA9PT0gMCkge1xyXG4gICAgICB0aGlzLmZpcnN0SXRlbSA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRvdGFsID0gaXRlbXMuc2VydmVyQ291bnQ7XHJcbiAgICB0aGlzLmxpbWl0ID0gcXVlcnkubGltaXQ7XHJcbiAgICB0aGlzLnNraXAgPSBNYXRoLmZsb29yKGl0ZW1zLnNraXAgLyBxdWVyeS5saW1pdCkgKyAxO1xyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICBlYWNoKGl0ZW1zLCAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMucm93cy5wdXNoKGNsb25lKGl0ZW0pKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXJ2aWNlLnNldFJvd3ModGhpcy5yb3dzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5yb3dzO1xyXG4gIH1cclxufVxyXG4iXX0=