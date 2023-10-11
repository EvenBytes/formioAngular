import { Component, ViewChild } from '@angular/core';
import { DefaultConfiguration } from '../form-manager.config';
import { FormioGridComponent } from '@formio/angular/grid';
import { debounce } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "../form-manager.config";
import * as i4 from "@angular/common";
import * as i5 from "@formio/angular/grid";
class FormManagerIndexComponent {
    service;
    route;
    router;
    config;
    searchElement;
    formGrid;
    gridQuery;
    onSearch;
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.config = { ...DefaultConfiguration, ...this.config };
        this.gridQuery = { type: this.config.type, sort: 'title' };
        if (this.config.tag) {
            this.gridQuery.tags = this.config.tag;
        }
        this.onSearch = debounce(this._onSearch, 300);
    }
    loadGrid() {
        this.gridQuery = JSON.parse(localStorage.getItem('query')) || this.gridQuery;
        const currentPage = +localStorage.getItem('currentPage') || 0;
        this.formGrid
            .refreshGrid(this.gridQuery)
            .then(() => this.formGrid.setPage(currentPage - 1));
    }
    ngOnInit() {
        this.gridQuery = { type: this.config.type, sort: 'title' };
        if (this.config.tag) {
            this.gridQuery.tags = this.config.tag;
        }
        this.service.reset();
        this.service.ready.then(() => {
            this.loadGrid();
            this.formGrid.footer.pageChanged.subscribe(page => {
                localStorage.setItem('currentPage', page.page);
            });
        });
    }
    ngAfterViewInit() {
        this.searchElement.nativeElement.value = localStorage.getItem('searchInput') || '';
    }
    _onSearch() {
        const search = this.searchElement.nativeElement.value;
        if (search.length > 0) {
            this.gridQuery.skip = 0;
            this.gridQuery.title__regex = '/' + search + '/i';
            this.gridQuery.title__regex = '/' + search.trim() + '/i';
        }
        else {
            delete this.gridQuery.title__regex;
        }
        localStorage.setItem('query', JSON.stringify(this.gridQuery));
        localStorage.setItem('searchInput', search);
        this.formGrid.pageChanged({ page: 1, itemPerPage: this.gridQuery.limit });
        this.formGrid.refreshGrid(this.gridQuery);
    }
    clearSearch() {
        this.gridQuery = { type: this.config.type, sort: 'title' };
        if (this.config.tag) {
            this.gridQuery.tags = this.config.tag;
        }
        localStorage.removeItem('query');
        localStorage.removeItem('searchInput');
        localStorage.removeItem('currentPage');
        if (this.searchElement?.nativeElement) {
            this.searchElement.nativeElement.value = '';
        }
        this.formGrid.pageChanged({ page: 1 });
        this.formGrid.query = {};
        this.formGrid.refreshGrid(this.gridQuery);
    }
    onAction(action) {
        this.service.form = null; // Reset previous form data
        this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
    }
    onSelect(row) {
        this.router.navigate([row._id], { relativeTo: this.route });
    }
    onCreateItem() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerIndexComponent, deps: [{ token: i1.FormManagerService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i3.FormManagerConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormManagerIndexComponent, selector: "ng-component", viewQueries: [{ propertyName: "searchElement", first: true, predicate: ["search"], descendants: true }, { propertyName: "formGrid", first: true, predicate: FormioGridComponent, descendants: true }], ngImport: i0, template: "<div role=\"search\" class=\"input-group mb-3\" *ngIf=\"config.includeSearch\">\r\n  <input #search type=\"text\" (keyup)=\"onSearch()\" class=\"form-control\" placeholder=\"Search Forms\" aria-label=\"Search Forms\" aria-describedby=\"button-search\">\r\n  <span *ngIf=\"search && search !== ''\" class=\"form-clear input-group-addon\" (click)=\"clearSearch()\"><span class=\"fa fa-times bi bi-x\"></span></span>\r\n</div>\r\n<formio-grid\r\n  *ngIf=\"service.ready\"\r\n  [formio]=\"service.formio\"\r\n  [gridType]=\"'form'\"\r\n  [query]=\"gridQuery\"\r\n  [isActionAllowed]=\"service.actionAllowed\"\r\n  (rowAction)=\"onAction($event)\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n></formio-grid>\r\n", styles: [".form-clear{background:#cecece;border-radius:50%;bottom:8px;color:#0000004d;cursor:pointer;display:flex;justify-content:center;align-items:center;padding-bottom:2px;height:24px;position:absolute;right:10px;top:6px;width:24px;z-index:10}.form-clear .fa{font-size:16px;font-weight:500}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
}
export { FormManagerIndexComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<div role=\"search\" class=\"input-group mb-3\" *ngIf=\"config.includeSearch\">\r\n  <input #search type=\"text\" (keyup)=\"onSearch()\" class=\"form-control\" placeholder=\"Search Forms\" aria-label=\"Search Forms\" aria-describedby=\"button-search\">\r\n  <span *ngIf=\"search && search !== ''\" class=\"form-clear input-group-addon\" (click)=\"clearSearch()\"><span class=\"fa fa-times bi bi-x\"></span></span>\r\n</div>\r\n<formio-grid\r\n  *ngIf=\"service.ready\"\r\n  [formio]=\"service.formio\"\r\n  [gridType]=\"'form'\"\r\n  [query]=\"gridQuery\"\r\n  [isActionAllowed]=\"service.actionAllowed\"\r\n  (rowAction)=\"onAction($event)\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n></formio-grid>\r\n", styles: [".form-clear{background:#cecece;border-radius:50%;bottom:8px;color:#0000004d;cursor:pointer;display:flex;justify-content:center;align-items:center;padding-bottom:2px;height:24px;position:absolute;right:10px;top:6px;width:24px;z-index:10}.form-clear .fa{font-size:16px;font-weight:500}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.FormManagerConfig }]; }, propDecorators: { searchElement: [{
                type: ViewChild,
                args: ['search']
            }], formGrid: [{
                type: ViewChild,
                args: [FormioGridComponent, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvaW5kZXgvaW5kZXguY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvaW5kZXgvaW5kZXguY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQXNCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd4RixPQUFPLEVBQUUsb0JBQW9CLEVBQXFCLE1BQU0sd0JBQXdCLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7OztBQUVsQyxNQUlhLHlCQUF5QjtJQU0zQjtJQUNBO0lBQ0E7SUFDQTtJQVJZLGFBQWEsQ0FBYTtJQUNFLFFBQVEsQ0FBc0I7SUFDeEUsU0FBUyxDQUFNO0lBQ2YsUUFBUSxDQUFDO0lBQ2hCLFlBQ1MsT0FBMkIsRUFDM0IsS0FBcUIsRUFDckIsTUFBYyxFQUNkLE1BQXlCO1FBSHpCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUVoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUMsR0FBRyxvQkFBb0IsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxNQUFNLENB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LENBQUMsR0FBUTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO3VHQXZGVSx5QkFBeUI7MkZBQXpCLHlCQUF5Qix3TEFFekIsbUJBQW1CLGdEQ2JoQyxzdUJBY0E7O1NESGEseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBSnJDLFNBQVM7OzJMQUthLGFBQWE7c0JBQWpDLFNBQVM7dUJBQUMsUUFBUTtnQkFDOEIsUUFBUTtzQkFBeEQsU0FBUzt1QkFBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuLi9mb3JtLW1hbmFnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IERlZmF1bHRDb25maWd1cmF0aW9uLCBGb3JtTWFuYWdlckNvbmZpZyB9IGZyb20gJy4uL2Zvcm0tbWFuYWdlci5jb25maWcnO1xyXG5pbXBvcnQgeyBGb3JtaW9HcmlkQ29tcG9uZW50IH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyL2dyaWQnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vaW5kZXguY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2luZGV4LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1NYW5hZ2VySW5kZXhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaCcpIHNlYXJjaEVsZW1lbnQ6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChGb3JtaW9HcmlkQ29tcG9uZW50LCB7c3RhdGljOiBmYWxzZX0pIGZvcm1HcmlkOiBGb3JtaW9HcmlkQ29tcG9uZW50O1xyXG4gIHB1YmxpYyBncmlkUXVlcnk6IGFueTtcclxuICBwdWJsaWMgb25TZWFyY2g7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgc2VydmljZTogRm9ybU1hbmFnZXJTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBjb25maWc6IEZvcm1NYW5hZ2VyQ29uZmlnXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IHsuLi5EZWZhdWx0Q29uZmlndXJhdGlvbiwgLi4udGhpcy5jb25maWd9O1xyXG4gICAgdGhpcy5ncmlkUXVlcnkgPSB7dHlwZTogdGhpcy5jb25maWcudHlwZSwgc29ydDogJ3RpdGxlJ307XHJcbiAgICBpZiAodGhpcy5jb25maWcudGFnKSB7XHJcbiAgICAgIHRoaXMuZ3JpZFF1ZXJ5LnRhZ3MgPSB0aGlzLmNvbmZpZy50YWc7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uU2VhcmNoID0gZGVib3VuY2UodGhpcy5fb25TZWFyY2gsIDMwMCk7XHJcbiAgfVxyXG5cclxuICBsb2FkR3JpZCgpIHtcclxuICAgIHRoaXMuZ3JpZFF1ZXJ5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncXVlcnknKSkgfHwgdGhpcy5ncmlkUXVlcnk7XHJcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFBhZ2UnKSB8fCAwO1xyXG4gICAgdGhpcy5mb3JtR3JpZFxyXG4gICAgICAucmVmcmVzaEdyaWQodGhpcy5ncmlkUXVlcnkpXHJcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuZm9ybUdyaWQuc2V0UGFnZShjdXJyZW50UGFnZSAtIDEpKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5ncmlkUXVlcnkgPSB7dHlwZTogdGhpcy5jb25maWcudHlwZSwgc29ydDogJ3RpdGxlJ307XHJcbiAgICBpZiAodGhpcy5jb25maWcudGFnKSB7XHJcbiAgICAgIHRoaXMuZ3JpZFF1ZXJ5LnRhZ3MgPSB0aGlzLmNvbmZpZy50YWc7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlcnZpY2UucmVzZXQoKTtcclxuICAgIHRoaXMuc2VydmljZS5yZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5sb2FkR3JpZCgpO1xyXG4gICAgICB0aGlzLmZvcm1HcmlkLmZvb3Rlci5wYWdlQ2hhbmdlZC5zdWJzY3JpYmUocGFnZSA9PiB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRQYWdlJywgcGFnZS5wYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VhcmNoRWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlYXJjaElucHV0JykgfHwgJyc7XHJcbiAgfVxyXG5cclxuICBfb25TZWFyY2goKSB7XHJcbiAgICBjb25zdCBzZWFyY2ggPSB0aGlzLnNlYXJjaEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgIGlmIChzZWFyY2gubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmdyaWRRdWVyeS5za2lwID0gMDtcclxuICAgICAgdGhpcy5ncmlkUXVlcnkudGl0bGVfX3JlZ2V4ID0gJy8nICsgc2VhcmNoICsgJy9pJztcclxuICAgICAgdGhpcy5ncmlkUXVlcnkudGl0bGVfX3JlZ2V4ID0gJy8nICsgc2VhcmNoLnRyaW0oKSArICcvaSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWxldGUgdGhpcy5ncmlkUXVlcnkudGl0bGVfX3JlZ2V4O1xyXG4gICAgfVxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3F1ZXJ5JywgSlNPTi5zdHJpbmdpZnkodGhpcy5ncmlkUXVlcnkpKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWFyY2hJbnB1dCcsIHNlYXJjaCk7XHJcbiAgICB0aGlzLmZvcm1HcmlkLnBhZ2VDaGFuZ2VkKHtwYWdlOiAxLCBpdGVtUGVyUGFnZTogdGhpcy5ncmlkUXVlcnkubGltaXR9KTtcclxuICAgIHRoaXMuZm9ybUdyaWQucmVmcmVzaEdyaWQodGhpcy5ncmlkUXVlcnkpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTZWFyY2goKSB7XHJcbiAgICB0aGlzLmdyaWRRdWVyeSA9IHt0eXBlOiB0aGlzLmNvbmZpZy50eXBlLCBzb3J0OiAndGl0bGUnfTtcclxuICAgIGlmICh0aGlzLmNvbmZpZy50YWcpIHtcclxuICAgICAgdGhpcy5ncmlkUXVlcnkudGFncyA9IHRoaXMuY29uZmlnLnRhZztcclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdxdWVyeScpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NlYXJjaElucHV0Jyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFBhZ2UnKTtcclxuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnQ/Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5zZWFyY2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgIH1cclxuICAgIHRoaXMuZm9ybUdyaWQucGFnZUNoYW5nZWQoe3BhZ2U6IDF9KTtcclxuICAgIHRoaXMuZm9ybUdyaWQucXVlcnkgPSB7fTtcclxuICAgIHRoaXMuZm9ybUdyaWQucmVmcmVzaEdyaWQodGhpcy5ncmlkUXVlcnkpO1xyXG4gIH1cclxuXHJcbiAgb25BY3Rpb24oYWN0aW9uOiBhbnkpIHtcclxuICAgIHRoaXMuc2VydmljZS5mb3JtID0gbnVsbDsgLy8gUmVzZXQgcHJldmlvdXMgZm9ybSBkYXRhXHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYWN0aW9uLnJvdy5faWQsIGFjdGlvbi5hY3Rpb25dLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdChyb3c6IGFueSkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3Jvdy5faWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XHJcbiAgfVxyXG5cclxuICBvbkNyZWF0ZUl0ZW0oKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2NyZWF0ZSddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgcm9sZT1cInNlYXJjaFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItM1wiICpuZ0lmPVwiY29uZmlnLmluY2x1ZGVTZWFyY2hcIj5cclxuICA8aW5wdXQgI3NlYXJjaCB0eXBlPVwidGV4dFwiIChrZXl1cCk9XCJvblNlYXJjaCgpXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBGb3Jtc1wiIGFyaWEtbGFiZWw9XCJTZWFyY2ggRm9ybXNcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiYnV0dG9uLXNlYXJjaFwiPlxyXG4gIDxzcGFuICpuZ0lmPVwic2VhcmNoICYmIHNlYXJjaCAhPT0gJydcIiBjbGFzcz1cImZvcm0tY2xlYXIgaW5wdXQtZ3JvdXAtYWRkb25cIiAoY2xpY2spPVwiY2xlYXJTZWFyY2goKVwiPjxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXMgYmkgYmkteFwiPjwvc3Bhbj48L3NwYW4+XHJcbjwvZGl2PlxyXG48Zm9ybWlvLWdyaWRcclxuICAqbmdJZj1cInNlcnZpY2UucmVhZHlcIlxyXG4gIFtmb3JtaW9dPVwic2VydmljZS5mb3JtaW9cIlxyXG4gIFtncmlkVHlwZV09XCInZm9ybSdcIlxyXG4gIFtxdWVyeV09XCJncmlkUXVlcnlcIlxyXG4gIFtpc0FjdGlvbkFsbG93ZWRdPVwic2VydmljZS5hY3Rpb25BbGxvd2VkXCJcclxuICAocm93QWN0aW9uKT1cIm9uQWN0aW9uKCRldmVudClcIlxyXG4gIChyb3dTZWxlY3QpPVwib25TZWxlY3QoJGV2ZW50KVwiXHJcbiAgKGNyZWF0ZUl0ZW0pPVwib25DcmVhdGVJdGVtKClcIlxyXG4+PC9mb3JtaW8tZ3JpZD5cclxuIl19