import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./parse-html-content.pipe";
class FormioAlertsComponent {
    alerts;
    focusComponent = new EventEmitter();
    ngOnInit() {
        if (!this.alerts) {
            this.alerts = new FormioAlerts();
        }
    }
    getComponent(event, alert) {
        this.focusComponent.emit(alert.component.key);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAlertsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FormioAlertsComponent, selector: "formio-alerts", inputs: { alerts: "alerts" }, outputs: { focusComponent: "focusComponent" }, ngImport: i0, template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\">\r\n  {{alert.message | parseHtmlContent}}\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "pipe", type: i2.ParseHtmlContentPipe, name: "parseHtmlContent" }] });
}
export { FormioAlertsComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAlertsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio-alerts', template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\">\r\n  {{alert.message | parseHtmlContent}}\r\n</div>\r\n" }]
        }], propDecorators: { alerts: [{
                type: Input
            }], focusComponent: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY29tcG9uZW50cy9hbGVydHMvZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY29tcG9uZW50cy9hbGVydHMvZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUUvQyxNQUlhLHFCQUFxQjtJQUN2QixNQUFNLENBQWU7SUFDcEIsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFDdEQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFDRCxZQUFZLENBQUUsS0FBSyxFQUFFLEtBQUs7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO3VHQVZVLHFCQUFxQjsyRkFBckIscUJBQXFCLGtJQ1BsQyxtTUFHQTs7U0RJYSxxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFKakMsU0FBUzsrQkFDRSxlQUFlOzhCQUloQixNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksY0FBYztzQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1pb0FsZXJ0cyB9IGZyb20gJy4vZm9ybWlvLmFsZXJ0cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Zvcm1pby1hbGVydHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtaW8uYWxlcnRzLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvQWxlcnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBhbGVydHM6IEZvcm1pb0FsZXJ0cztcclxuICBAT3V0cHV0KCkgZm9jdXNDb21wb25lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5hbGVydHMpIHtcclxuICAgICAgdGhpcy5hbGVydHMgPSBuZXcgRm9ybWlvQWxlcnRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldENvbXBvbmVudCAoZXZlbnQsIGFsZXJ0KSB7XHJcbiAgICB0aGlzLmZvY3VzQ29tcG9uZW50LmVtaXQoYWxlcnQuY29tcG9uZW50LmtleSk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgKm5nRm9yPVwibGV0IGFsZXJ0IG9mIGFsZXJ0cy5hbGVydHNcIiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXt7IGFsZXJ0LnR5cGUgfX1cIiByb2xlPVwiYWxlcnRcIiAoY2xpY2spPVwiZ2V0Q29tcG9uZW50KCRldmVudCwgYWxlcnQpXCI+XHJcbiAge3thbGVydC5tZXNzYWdlIHwgcGFyc2VIdG1sQ29udGVudH19XHJcbjwvZGl2PlxyXG4iXX0=