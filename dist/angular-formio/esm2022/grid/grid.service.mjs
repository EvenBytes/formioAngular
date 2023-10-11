import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
class GridService {
    rows;
    constructor() { }
    setRows(rows) {
        this.rows = rows;
    }
    getFormsPerPage() {
        return this.rows?.length;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridService });
}
export { GridService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GridService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vZ3JpZC9zcmMvZ3JpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRzNDLE1BQ2EsV0FBVztJQUNmLElBQUksQ0FBYTtJQUN4QixnQkFBZSxDQUFDO0lBRWhCLE9BQU8sQ0FBQyxJQUFJO1FBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO0lBQzNCLENBQUM7dUdBVlUsV0FBVzsyR0FBWCxXQUFXOztTQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IF9pbnRlcnNlY3Rpb24gZnJvbSAnbG9kYXNoL2ludGVyc2VjdGlvbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHcmlkU2VydmljZSB7XHJcbiAgcHVibGljIHJvd3M6IEFycmF5PGFueT47XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBzZXRSb3dzKHJvd3MpIHtcclxuICAgIHRoaXMucm93cyA9IHJvd3M7XHJcbiAgfVxyXG5cclxuICBnZXRGb3Jtc1BlclBhZ2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3dzPy5sZW5ndGg7XHJcbiAgfVxyXG59XHJcbiJdfQ==