import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './components/formio/formio.component';
import { FormioReportComponent } from './components/formioreport/formioreport.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { ParseHtmlContentPipe } from './components/alerts/parse-html-content.pipe';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CustomTagsService } from './custom-component/custom-tags.service';
import { FormioBaseComponent } from './FormioBaseComponent';
import * as i0 from "@angular/core";
class FormioModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: FormioModule, declarations: [FormioComponent,
            FormioReportComponent,
            FormioBaseComponent,
            FormBuilderComponent,
            FormioLoaderComponent,
            FormioAlertsComponent,
            ParseHtmlContentPipe], imports: [CommonModule], exports: [FormioComponent,
            FormioReportComponent,
            FormBuilderComponent,
            FormioLoaderComponent,
            FormioAlertsComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioModule, providers: [
            FormioAlerts,
            CustomTagsService
        ], imports: [CommonModule] });
}
export { FormioModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FormioComponent,
                        FormioReportComponent,
                        FormioBaseComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent,
                        ParseHtmlContentPipe
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        FormioComponent,
                        FormioReportComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent
                    ],
                    providers: [
                        FormioAlerts,
                        CustomTagsService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3NyYy9mb3JtaW8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTVELE1BeUJhLFlBQVk7dUdBQVosWUFBWTt3R0FBWixZQUFZLGlCQXZCakIsZUFBZTtZQUNmLHFCQUFxQjtZQUNyQixtQkFBbUI7WUFDbkIsb0JBQW9CO1lBQ3BCLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIsb0JBQW9CLGFBR3BCLFlBQVksYUFHWixlQUFlO1lBQ2YscUJBQXFCO1lBQ3JCLG9CQUFvQjtZQUNwQixxQkFBcUI7WUFDckIscUJBQXFCO3dHQU9oQixZQUFZLGFBTFY7WUFDUCxZQUFZO1lBQ1osaUJBQWlCO1NBQ3BCLFlBWkcsWUFBWTs7U0FjUCxZQUFZOzJGQUFaLFlBQVk7a0JBekJ4QixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixvQkFBb0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLHFCQUFxQjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osaUJBQWlCO3FCQUNwQjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1pb0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtaW8vZm9ybWlvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1JlcG9ydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtaW9yZXBvcnQvZm9ybWlvcmVwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvcm1idWlsZGVyL2Zvcm1idWlsZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb0FsZXJ0cyB9IGZyb20gJy4vY29tcG9uZW50cy9hbGVydHMvZm9ybWlvLmFsZXJ0cyc7XHJcbmltcG9ydCB7IFBhcnNlSHRtbENvbnRlbnRQaXBlIH0gZnJvbSAnLi9jb21wb25lbnRzL2FsZXJ0cy9wYXJzZS1odG1sLWNvbnRlbnQucGlwZSc7XHJcbmltcG9ydCB7IEZvcm1pb0FsZXJ0c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hbGVydHMvZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9Mb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGVyL2Zvcm1pby5sb2FkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ3VzdG9tVGFnc1NlcnZpY2UgfSBmcm9tICcuL2N1c3RvbS1jb21wb25lbnQvY3VzdG9tLXRhZ3Muc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb0Jhc2VDb21wb25lbnQgfSBmcm9tICcuL0Zvcm1pb0Jhc2VDb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZvcm1pb0NvbXBvbmVudCxcclxuICAgICAgICBGb3JtaW9SZXBvcnRDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybWlvQmFzZUNvbXBvbmVudCxcclxuICAgICAgICBGb3JtQnVpbGRlckNvbXBvbmVudCxcclxuICAgICAgICBGb3JtaW9Mb2FkZXJDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybWlvQWxlcnRzQ29tcG9uZW50LFxyXG4gICAgICAgIFBhcnNlSHRtbENvbnRlbnRQaXBlXHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBGb3JtaW9Db21wb25lbnQsXHJcbiAgICAgICAgRm9ybWlvUmVwb3J0Q29tcG9uZW50LFxyXG4gICAgICAgIEZvcm1CdWlsZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEZvcm1pb0xvYWRlckNvbXBvbmVudCxcclxuICAgICAgICBGb3JtaW9BbGVydHNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBGb3JtaW9BbGVydHMsXHJcbiAgICAgICAgQ3VzdG9tVGFnc1NlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb01vZHVsZSB7fVxyXG4iXX0=