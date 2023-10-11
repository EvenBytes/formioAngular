import { Component } from '@angular/core';
import { get } from 'lodash';
import { GridBodyComponent } from '../GridBodyComponent';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class SubmissionGridBodyComponent extends GridBodyComponent {
    load(formio, query) {
        query = query || {};
        return formio.loadSubmissions({ params: query })
            .then((submissions) => this.setRows(query, submissions));
    }
    /**
     * Render the cell data.
     *
     * @param submission
     * @param header
     * @return any
     */
    view(submission, header) {
        const cellValue = get(submission, header.key);
        if (header.renderCell) {
            return header.renderCell(cellValue, header.component);
        }
        else {
            if (header.component) {
                if (header.component.getView) {
                    return header.component.getView(cellValue);
                }
                return header.component.asString(cellValue);
            }
            else {
                return cellValue.toString();
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridBodyComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: SubmissionGridBodyComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-template>\r\n  <tbody>\r\n    <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\">\r\n      <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
}
export { SubmissionGridBodyComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: SubmissionGridBodyComponent, decorators: [{
            type: Component,
            args: [{ template: "<ng-template>\r\n  <tbody>\r\n    <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\">\r\n      <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td>\r\n    </tr>\r\n  </tbody>\r\n</ng-template>\r\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VibWlzc2lvbkdyaWRCb2R5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL3N1Ym1pc3Npb24vU3VibWlzc2lvbkdyaWRCb2R5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL2dyaWQvc3JjL3N1Ym1pc3Npb24vU3VibWlzc2lvbkdyaWRCb2R5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFRLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSXpELE1BR2EsMkJBQTRCLFNBQVEsaUJBQWlCO0lBQ2hFLElBQUksQ0FBQyxNQUE0QixFQUFFLEtBQVc7UUFDNUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDcEIsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQzdDLElBQUksQ0FBQyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILElBQUksQ0FBQyxVQUE0QixFQUFFLE1BQWtCO1FBQ25ELE1BQU0sU0FBUyxHQUFRLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUNyQixPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUNwQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO29CQUM1QixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNMLE9BQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzdCO1NBQ0Y7SUFDSCxDQUFDO3VHQTVCVSwyQkFBMkI7MkZBQTNCLDJCQUEyQiwyRUNUeEMsNFBBT0E7O1NERWEsMkJBQTJCOzJGQUEzQiwyQkFBMkI7a0JBSHZDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZWFjaCwgZ2V0IH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgR3JpZEJvZHlDb21wb25lbnQgfSBmcm9tICcuLi9HcmlkQm9keUNvbXBvbmVudCc7XHJcbmltcG9ydCB7Rm9ybWlvUHJvbWlzZVNlcnZpY2V9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbmltcG9ydCB7IEdyaWRIZWFkZXIgfSBmcm9tICcuLi90eXBlcy9ncmlkLWhlYWRlcic7XHJcbmltcG9ydCB7Rm9ybWlvU3VibWlzc2lvbn0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL1N1Ym1pc3Npb25HcmlkQm9keS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFN1Ym1pc3Npb25HcmlkQm9keUNvbXBvbmVudCBleHRlbmRzIEdyaWRCb2R5Q29tcG9uZW50IHtcclxuICBsb2FkKGZvcm1pbzogRm9ybWlvUHJvbWlzZVNlcnZpY2UsIHF1ZXJ5PzogYW55KSB7XHJcbiAgICBxdWVyeSA9IHF1ZXJ5IHx8IHt9O1xyXG4gICAgcmV0dXJuIGZvcm1pby5sb2FkU3VibWlzc2lvbnMoeyBwYXJhbXM6IHF1ZXJ5IH0pXHJcbiAgICAgIC50aGVuKChzdWJtaXNzaW9uczogYW55KSA9PiB0aGlzLnNldFJvd3MocXVlcnksIHN1Ym1pc3Npb25zKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW5kZXIgdGhlIGNlbGwgZGF0YS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdWJtaXNzaW9uXHJcbiAgICogQHBhcmFtIGhlYWRlclxyXG4gICAqIEByZXR1cm4gYW55XHJcbiAgICovXHJcbiAgdmlldyhzdWJtaXNzaW9uOiBGb3JtaW9TdWJtaXNzaW9uLCBoZWFkZXI6IEdyaWRIZWFkZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgY2VsbFZhbHVlOiBhbnkgPSBnZXQoc3VibWlzc2lvbiwgaGVhZGVyLmtleSk7XHJcbiAgICBpZiAoaGVhZGVyLnJlbmRlckNlbGwpIHtcclxuICAgICAgcmV0dXJuIGhlYWRlci5yZW5kZXJDZWxsKGNlbGxWYWx1ZSwgaGVhZGVyLmNvbXBvbmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaGVhZGVyLmNvbXBvbmVudCkge1xyXG4gICAgICAgIGlmIChoZWFkZXIuY29tcG9uZW50LmdldFZpZXcpIHtcclxuICAgICAgICAgIHJldHVybiBoZWFkZXIuY29tcG9uZW50LmdldFZpZXcoY2VsbFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlci5jb21wb25lbnQuYXNTdHJpbmcoY2VsbFZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gY2VsbFZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPG5nLXRlbXBsYXRlPlxyXG4gIDx0Ym9keT5cclxuICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHJvd3NcIiAoY2xpY2spPVwib25Sb3dTZWxlY3QoJGV2ZW50LCByb3cpXCI+XHJcbiAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgcm93SGVhZGVyIG9mIGhlYWRlci5oZWFkZXJzXCIgW2lubmVySFRNTF09XCJ2aWV3KHJvdywgcm93SGVhZGVyKVwiPjwvdGQ+XHJcbiAgICA8L3RyPlxyXG4gIDwvdGJvZHk+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==