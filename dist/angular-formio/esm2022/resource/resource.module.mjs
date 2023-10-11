import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormioModule } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { FormioResourceComponent } from './resource.component';
import { FormioResourceViewComponent } from './view/view.component';
import { FormioResourceEditComponent } from './edit/edit.component';
import { FormioResourceDeleteComponent } from './delete/delete.component';
import { FormioResourceCreateComponent } from './create/create.component';
import { FormioResourceIndexComponent } from './index/index.component';
import { FormioResourceRoutes } from './resource.routes';
import { extendRouter } from '@formio/angular';
import * as i0 from "@angular/core";
class FormioResource {
    static forChild(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
    static forRoot(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, declarations: [FormioResourceComponent,
            FormioResourceCreateComponent,
            FormioResourceIndexComponent,
            FormioResourceViewComponent,
            FormioResourceEditComponent,
            FormioResourceDeleteComponent], imports: [CommonModule,
            FormioModule,
            FormioGrid,
            RouterModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, providers: [
            FormioAlerts
        ], imports: [CommonModule,
            FormioModule,
            FormioGrid,
            RouterModule] });
}
export { FormioResource };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioResource, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        FormioGrid,
                        RouterModule
                    ],
                    declarations: [
                        FormioResourceComponent,
                        FormioResourceCreateComponent,
                        FormioResourceIndexComponent,
                        FormioResourceViewComponent,
                        FormioResourceEditComponent,
                        FormioResourceDeleteComponent
                    ],
                    providers: [
                        FormioAlerts
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vcmVzb3VyY2Uvc3JjL3Jlc291cmNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUvQyxNQW1CYSxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBa0M7UUFDaEQsT0FBTyxZQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWtDO1FBQy9DLE9BQU8sWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNwRSxDQUFDO3VHQU5VLGNBQWM7d0dBQWQsY0FBYyxpQkFYdkIsdUJBQXVCO1lBQ3ZCLDZCQUE2QjtZQUM3Qiw0QkFBNEI7WUFDNUIsMkJBQTJCO1lBQzNCLDJCQUEyQjtZQUMzQiw2QkFBNkIsYUFYN0IsWUFBWTtZQUNaLFlBQVk7WUFDWixVQUFVO1lBQ1YsWUFBWTt3R0FjSCxjQUFjLGFBSmQ7WUFDVCxZQUFZO1NBQ2IsWUFmQyxZQUFZO1lBQ1osWUFBWTtZQUNaLFVBQVU7WUFDVixZQUFZOztTQWNILGNBQWM7MkZBQWQsY0FBYztrQkFuQjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7cUJBQ2I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHVCQUF1Qjt3QkFDdkIsNkJBQTZCO3dCQUM3Qiw0QkFBNEI7d0JBQzVCLDJCQUEyQjt3QkFDM0IsMkJBQTJCO3dCQUMzQiw2QkFBNkI7cUJBQzlCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxZQUFZO3FCQUNiO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybWlvTW9kdWxlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvR3JpZCB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhci9ncmlkJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy92aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlRWRpdENvbXBvbmVudCB9IGZyb20gJy4vZWRpdC9lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlRGVsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9kZWxldGUvZGVsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlQ3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlSW5kZXhDb21wb25lbnQgfSBmcm9tICcuL2luZGV4L2luZGV4LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlUm91dGVDb25maWcgfSBmcm9tICcuL3Jlc291cmNlLmNvbmZpZyc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc291cmNlUm91dGVzIH0gZnJvbSAnLi9yZXNvdXJjZS5yb3V0ZXMnO1xyXG5pbXBvcnQgeyBleHRlbmRSb3V0ZXIgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3JtaW9Nb2R1bGUsXHJcbiAgICBGb3JtaW9HcmlkLFxyXG4gICAgUm91dGVyTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1pb1Jlc291cmNlQ29tcG9uZW50LFxyXG4gICAgRm9ybWlvUmVzb3VyY2VDcmVhdGVDb21wb25lbnQsXHJcbiAgICBGb3JtaW9SZXNvdXJjZUluZGV4Q29tcG9uZW50LFxyXG4gICAgRm9ybWlvUmVzb3VyY2VWaWV3Q29tcG9uZW50LFxyXG4gICAgRm9ybWlvUmVzb3VyY2VFZGl0Q29tcG9uZW50LFxyXG4gICAgRm9ybWlvUmVzb3VyY2VEZWxldGVDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgRm9ybWlvQWxlcnRzXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvUmVzb3VyY2Uge1xyXG4gIHN0YXRpYyBmb3JDaGlsZChjb25maWc/OiBGb3JtaW9SZXNvdXJjZVJvdXRlQ29uZmlnKTogYW55IHtcclxuICAgIHJldHVybiBleHRlbmRSb3V0ZXIoRm9ybWlvUmVzb3VyY2UsIGNvbmZpZywgRm9ybWlvUmVzb3VyY2VSb3V0ZXMpO1xyXG4gIH1cclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBGb3JtaW9SZXNvdXJjZVJvdXRlQ29uZmlnKTogYW55IHtcclxuICAgIHJldHVybiBleHRlbmRSb3V0ZXIoRm9ybWlvUmVzb3VyY2UsIGNvbmZpZywgRm9ybWlvUmVzb3VyY2VSb3V0ZXMpO1xyXG4gIH1cclxufVxyXG4iXX0=