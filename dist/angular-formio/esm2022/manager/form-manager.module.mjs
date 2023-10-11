import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { FormManagerIndexComponent } from './index/index.component';
import { FormManagerCreateComponent } from './create/create.component';
import { FormManagerFormComponent } from './form/form.component';
import { FormManagerViewComponent } from './view/view.component';
import { FormManagerEditComponent } from './edit/edit.component';
import { FormManagerDeleteComponent } from './delete/delete.component';
import { SubmissionComponent } from './submission/submission/submission.component';
import { SubmissionEditComponent } from './submission/edit/edit.component';
import { SubmissionDeleteComponent } from './submission/delete/delete.component';
import { SubmissionViewComponent } from './submission/view/view.component';
import { SubmissionIndexComponent } from './submission/index/index.component';
import { FormManagerRoutes } from './form-manager.routes';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { extendRouter } from '@formio/angular';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/modal";
import * as i2 from "ngx-bootstrap/pagination";
class FormManagerModule {
    static forChild(config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    }
    static forRoot(config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: FormManagerModule, declarations: [FormManagerIndexComponent,
            FormManagerCreateComponent,
            FormManagerFormComponent,
            FormManagerViewComponent,
            FormManagerEditComponent,
            FormManagerDeleteComponent,
            SubmissionComponent,
            SubmissionEditComponent,
            SubmissionDeleteComponent,
            SubmissionViewComponent,
            SubmissionIndexComponent], imports: [CommonModule,
            FormioModule,
            RouterModule,
            FormsModule,
            FormioGrid, i1.ModalModule, i2.PaginationModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerModule, imports: [CommonModule,
            FormioModule,
            RouterModule,
            FormsModule,
            FormioGrid,
            ModalModule.forRoot(),
            PaginationModule.forRoot()] });
}
export { FormManagerModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormManagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        RouterModule,
                        FormsModule,
                        FormioGrid,
                        ModalModule.forRoot(),
                        PaginationModule.forRoot()
                    ],
                    declarations: [
                        FormManagerIndexComponent,
                        FormManagerCreateComponent,
                        FormManagerFormComponent,
                        FormManagerViewComponent,
                        FormManagerEditComponent,
                        FormManagerDeleteComponent,
                        SubmissionComponent,
                        SubmissionEditComponent,
                        SubmissionDeleteComponent,
                        SubmissionViewComponent,
                        SubmissionIndexComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL21hbmFnZXIvc3JjL2Zvcm0tbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFDL0MsTUF3QmEsaUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBK0I7UUFDN0MsT0FBTyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBK0I7UUFDNUMsT0FBTyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDcEUsQ0FBQzt1R0FOVSxpQkFBaUI7d0dBQWpCLGlCQUFpQixpQkFiMUIseUJBQXlCO1lBQ3pCLDBCQUEwQjtZQUMxQix3QkFBd0I7WUFDeEIsd0JBQXdCO1lBQ3hCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsbUJBQW1CO1lBQ25CLHVCQUF1QjtZQUN2Qix5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLHdCQUF3QixhQW5CeEIsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osV0FBVztZQUNYLFVBQVU7d0dBa0JELGlCQUFpQixZQXRCMUIsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osV0FBVztZQUNYLFVBQVU7WUFDVixXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTs7U0FnQmpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQXhCN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxVQUFVO3dCQUNWLFdBQVcsQ0FBQyxPQUFPLEVBQUU7d0JBQ3JCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtxQkFDM0I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHlCQUF5Qjt3QkFDekIsMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4QiwwQkFBMEI7d0JBQzFCLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2Qix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3FCQUN6QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtaW9Nb2R1bGUgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW9HcmlkIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyL2dyaWQnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlckluZGV4Q29tcG9uZW50IH0gZnJvbSAnLi9pbmRleC9pbmRleC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlckNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4vY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlckZvcm1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0vZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlclZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlckVkaXRDb21wb25lbnQgfSBmcm9tICcuL2VkaXQvZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlckRlbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vZGVsZXRlL2RlbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zdWJtaXNzaW9uL3N1Ym1pc3Npb24vc3VibWlzc2lvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uRWRpdENvbXBvbmVudCB9IGZyb20gJy4vc3VibWlzc2lvbi9lZGl0L2VkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VibWlzc2lvbkRlbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vc3VibWlzc2lvbi9kZWxldGUvZGVsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1Ym1pc3Npb25WaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9zdWJtaXNzaW9uL3ZpZXcvdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJtaXNzaW9uSW5kZXhDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pc3Npb24vaW5kZXgvaW5kZXguY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJSb3V0ZUNvbmZpZyB9IGZyb20gJy4vZm9ybS1tYW5hZ2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyUm91dGVzIH0gZnJvbSAnLi9mb3JtLW1hbmFnZXIucm91dGVzJztcclxuaW1wb3J0IHsgUGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvcGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IE1vZGFsTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9tb2RhbCc7XHJcbmltcG9ydCB7IGV4dGVuZFJvdXRlciB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybWlvTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBGb3JtaW9HcmlkLFxyXG4gICAgTW9kYWxNb2R1bGUuZm9yUm9vdCgpLFxyXG4gICAgUGFnaW5hdGlvbk1vZHVsZS5mb3JSb290KClcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9ybU1hbmFnZXJJbmRleENvbXBvbmVudCxcclxuICAgIEZvcm1NYW5hZ2VyQ3JlYXRlQ29tcG9uZW50LFxyXG4gICAgRm9ybU1hbmFnZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgRm9ybU1hbmFnZXJWaWV3Q29tcG9uZW50LFxyXG4gICAgRm9ybU1hbmFnZXJFZGl0Q29tcG9uZW50LFxyXG4gICAgRm9ybU1hbmFnZXJEZWxldGVDb21wb25lbnQsXHJcbiAgICBTdWJtaXNzaW9uQ29tcG9uZW50LFxyXG4gICAgU3VibWlzc2lvbkVkaXRDb21wb25lbnQsXHJcbiAgICBTdWJtaXNzaW9uRGVsZXRlQ29tcG9uZW50LFxyXG4gICAgU3VibWlzc2lvblZpZXdDb21wb25lbnQsXHJcbiAgICBTdWJtaXNzaW9uSW5kZXhDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtTWFuYWdlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvckNoaWxkKGNvbmZpZz86IEZvcm1NYW5hZ2VyUm91dGVDb25maWcpOiBhbnkge1xyXG4gICAgcmV0dXJuIGV4dGVuZFJvdXRlcihGb3JtTWFuYWdlck1vZHVsZSwgY29uZmlnLCBGb3JtTWFuYWdlclJvdXRlcyk7XHJcbiAgfVxyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IEZvcm1NYW5hZ2VyUm91dGVDb25maWcpOiBhbnkge1xyXG4gICAgcmV0dXJuIGV4dGVuZFJvdXRlcihGb3JtTWFuYWdlck1vZHVsZSwgY29uZmlnLCBGb3JtTWFuYWdlclJvdXRlcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==