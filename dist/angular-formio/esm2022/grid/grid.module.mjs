import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import { FormioGridComponent } from './grid.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormGridHeaderComponent } from './form/FormGridHeader.component';
import { FormGridBodyComponent } from './form/FormGridBody.component';
import { FormGridFooterComponent } from './form/FormGridFooter.component';
import { SubmissionGridHeaderComponent } from './submission/SubmissionGridHeader.component';
import { SubmissionGridBodyComponent } from './submission/SubmissionGridBody.component';
import { SubmissionGridFooterComponent } from './submission/SubmissionGridFooter.component';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridBodyComponent } from './GridBodyComponent';
import { GridFooterComponent } from './GridFooterComponent';
import { GridService } from './grid.service';
import { TimeSince } from './form/time-since.pipe';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/pagination";
class FormioGrid {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, declarations: [FormioGridComponent,
            FormGridHeaderComponent,
            FormGridBodyComponent,
            FormGridFooterComponent,
            SubmissionGridHeaderComponent,
            SubmissionGridBodyComponent,
            SubmissionGridFooterComponent,
            GridHeaderComponent,
            GridBodyComponent,
            GridFooterComponent,
            TimeSince], imports: [CommonModule,
            FormsModule,
            FormioModule,
            RouterModule, i1.PaginationModule], exports: [FormioGridComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, providers: [
            FormioAlerts,
            GridService
        ], imports: [CommonModule,
            FormsModule,
            FormioModule,
            RouterModule,
            PaginationModule.forRoot()] });
}
export { FormioGrid };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioGrid, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        FormioModule,
                        RouterModule,
                        PaginationModule.forRoot()
                    ],
                    declarations: [
                        FormioGridComponent,
                        FormGridHeaderComponent,
                        FormGridBodyComponent,
                        FormGridFooterComponent,
                        SubmissionGridHeaderComponent,
                        SubmissionGridBodyComponent,
                        SubmissionGridFooterComponent,
                        GridHeaderComponent,
                        GridBodyComponent,
                        GridFooterComponent,
                        TimeSince
                    ],
                    exports: [
                        FormioGridComponent
                    ],
                    providers: [
                        FormioAlerts,
                        GridService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9ncmlkL3NyYy9ncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDNUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDNUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTs7O0FBQ2xELE1BNkJhLFVBQVU7dUdBQVYsVUFBVTt3R0FBVixVQUFVLGlCQXBCZixtQkFBbUI7WUFDbkIsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQix1QkFBdUI7WUFDdkIsNkJBQTZCO1lBQzdCLDJCQUEyQjtZQUMzQiw2QkFBNkI7WUFDN0IsbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsU0FBUyxhQWpCVCxZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixZQUFZLGtDQWlCWixtQkFBbUI7d0dBT2QsVUFBVSxhQUxSO1lBQ1AsWUFBWTtZQUNaLFdBQVc7U0FDZCxZQXpCRyxZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixZQUFZO1lBQ1osZ0JBQWdCLENBQUMsT0FBTyxFQUFFOztTQXVCckIsVUFBVTsyRkFBVixVQUFVO2tCQTdCdEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7cUJBQzdCO29CQUNELFlBQVksRUFBRTt3QkFDVixtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIscUJBQXFCO3dCQUNyQix1QkFBdUI7d0JBQ3ZCLDZCQUE2Qjt3QkFDN0IsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLFNBQVM7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG1CQUFtQjtxQkFDdEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVztxQkFDZDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtaW9Nb2R1bGUgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW9BbGVydHMgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW9HcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgeyBGb3JtR3JpZEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS9Gb3JtR3JpZEhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtR3JpZEJvZHlDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0vRm9ybUdyaWRCb2R5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1HcmlkRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL0Zvcm1HcmlkRm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1Ym1pc3Npb25HcmlkSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zdWJtaXNzaW9uL1N1Ym1pc3Npb25HcmlkSGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1Ym1pc3Npb25HcmlkQm9keUNvbXBvbmVudCB9IGZyb20gJy4vc3VibWlzc2lvbi9TdWJtaXNzaW9uR3JpZEJvZHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VibWlzc2lvbkdyaWRGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vU3VibWlzc2lvbkdyaWRGb290ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vR3JpZEhlYWRlckNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9HcmlkQm9keUNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL0dyaWRGb290ZXJDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkU2VydmljZSB9IGZyb20gJy4vZ3JpZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGltZVNpbmNlIH0gZnJvbSAnLi9mb3JtL3RpbWUtc2luY2UucGlwZSdcclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgRm9ybWlvTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZSxcclxuICAgICAgICBQYWdpbmF0aW9uTW9kdWxlLmZvclJvb3QoKVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZvcm1pb0dyaWRDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybUdyaWRIZWFkZXJDb21wb25lbnQsXHJcbiAgICAgICAgRm9ybUdyaWRCb2R5Q29tcG9uZW50LFxyXG4gICAgICAgIEZvcm1HcmlkRm9vdGVyQ29tcG9uZW50LFxyXG4gICAgICAgIFN1Ym1pc3Npb25HcmlkSGVhZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIFN1Ym1pc3Npb25HcmlkQm9keUNvbXBvbmVudCxcclxuICAgICAgICBTdWJtaXNzaW9uR3JpZEZvb3RlckNvbXBvbmVudCxcclxuICAgICAgICBHcmlkSGVhZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEdyaWRCb2R5Q29tcG9uZW50LFxyXG4gICAgICAgIEdyaWRGb290ZXJDb21wb25lbnQsXHJcbiAgICAgICAgVGltZVNpbmNlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEZvcm1pb0dyaWRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBGb3JtaW9BbGVydHMsXHJcbiAgICAgICAgR3JpZFNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb0dyaWQge31cclxuIl19