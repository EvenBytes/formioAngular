import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';
import { FormioResetPassComponent } from './resetpass/resetpass.component';
import { FormioAuthRoutes } from './auth.routes';
import { extendRouter } from '@formio/angular';
import * as i0 from "@angular/core";
class FormioAuth {
    static forRoot(config) {
        return extendRouter(FormioAuth, config, FormioAuthRoutes);
    }
    static forChild(config) {
        return extendRouter(FormioAuth, config, FormioAuthRoutes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuth, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: FormioAuth, declarations: [FormioAuthComponent,
            FormioAuthLoginComponent,
            FormioAuthRegisterComponent,
            FormioResetPassComponent], imports: [CommonModule,
            FormioModule,
            RouterModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuth, imports: [CommonModule,
            FormioModule,
            RouterModule] });
}
export { FormioAuth };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuth, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        RouterModule
                    ],
                    declarations: [
                        FormioAuthComponent,
                        FormioAuthLoginComponent,
                        FormioAuthRegisterComponent,
                        FormioResetPassComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9hdXRoL3NyYy9hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25FLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRS9DLE1BYWEsVUFBVTtJQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQThCO1FBQzNDLE9BQU8sWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUE4QjtRQUM1QyxPQUFPLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDNUQsQ0FBQzt1R0FOVSxVQUFVO3dHQUFWLFVBQVUsaUJBTm5CLG1CQUFtQjtZQUNuQix3QkFBd0I7WUFDeEIsMkJBQTJCO1lBQzNCLHdCQUF3QixhQVJ4QixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7d0dBU0gsVUFBVSxZQVhuQixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7O1NBU0gsVUFBVTsyRkFBVixVQUFVO2tCQWJ0QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLDJCQUEyQjt3QkFDM0Isd0JBQXdCO3FCQUN6QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1pb01vZHVsZSB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhDb21wb25lbnQgfSBmcm9tICcuL2F1dGguY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9BdXRoUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tICcuL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc2V0UGFzc0NvbXBvbmVudCB9IGZyb20gJy4vcmVzZXRwYXNzL3Jlc2V0cGFzcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9BdXRoUm91dGVDb25maWcgfSBmcm9tICcuL2F1dGguY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFJvdXRlcyB9IGZyb20gJy4vYXV0aC5yb3V0ZXMnO1xyXG5pbXBvcnQgeyBleHRlbmRSb3V0ZXIgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3JtaW9Nb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9ybWlvQXV0aENvbXBvbmVudCxcclxuICAgIEZvcm1pb0F1dGhMb2dpbkNvbXBvbmVudCxcclxuICAgIEZvcm1pb0F1dGhSZWdpc3RlckNvbXBvbmVudCxcclxuICAgIEZvcm1pb1Jlc2V0UGFzc0NvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb0F1dGgge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IEZvcm1pb0F1dGhSb3V0ZUNvbmZpZyk6IGFueSB7XHJcbiAgICByZXR1cm4gZXh0ZW5kUm91dGVyKEZvcm1pb0F1dGgsIGNvbmZpZywgRm9ybWlvQXV0aFJvdXRlcyk7XHJcbiAgfVxyXG4gIHN0YXRpYyBmb3JDaGlsZChjb25maWc/OiBGb3JtaW9BdXRoUm91dGVDb25maWcpOiBhbnkge1xyXG4gICAgcmV0dXJuIGV4dGVuZFJvdXRlcihGb3JtaW9BdXRoLCBjb25maWcsIEZvcm1pb0F1dGhSb3V0ZXMpO1xyXG4gIH1cclxufVxyXG4iXX0=