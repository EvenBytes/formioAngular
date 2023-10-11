import { EventEmitter, Injectable } from '@angular/core';
import { get, each } from 'lodash';
import { Formio } from '@formio/js';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular";
import * as i2 from "./auth.config";
class FormioAuthService {
    appConfig;
    config;
    user;
    authenticated = false;
    loginForm;
    onLogin;
    onLogout;
    registerForm;
    onRegister;
    onUser;
    onError;
    resetPassForm;
    onResetPass;
    ready;
    readyResolve;
    readyReject;
    projectReady;
    accessReady;
    userReady;
    formAccess = {};
    submissionAccess = {};
    roles;
    is = {};
    constructor(appConfig, config) {
        this.appConfig = appConfig;
        this.config = config;
        this.user = null;
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
            Formio.formOnly = !!this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.loginForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'login.form', 'user/login');
        this.registerForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'register.form', 'user/register');
        this.resetPassForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'register.form', 'resetpass');
        this.onLogin = new EventEmitter();
        this.onLogout = new EventEmitter();
        this.onRegister = new EventEmitter();
        this.onUser = new EventEmitter();
        this.onError = new EventEmitter();
        this.ready = new Promise((resolve, reject) => {
            this.readyResolve = resolve;
            this.readyReject = reject;
        });
        // Register for the core events.
        Formio.events.on('formio.badToken', () => this.logoutError());
        Formio.events.on('formio.sessionExpired', () => this.logoutError());
        if (!this.config.delayAuth) {
            this.init();
        }
    }
    onLoginSubmit(submission) {
        this.setUser(submission);
        this.onLogin.emit(submission);
    }
    onRegisterSubmit(submission) {
        this.setUser(submission);
        this.onRegister.emit(submission);
    }
    onResetPassSubmit(submission) {
        this.onResetPass.emit(submission);
    }
    init() {
        this.projectReady = Formio.makeStaticRequest(this.appConfig.appUrl).then((project) => {
            each(project.access, (access) => {
                this.formAccess[access.type] = access.roles;
            });
        }, () => {
            this.formAccess = {};
            return null;
        });
        // Get the access for this project.
        this.accessReady = Formio.makeStaticRequest(this.appConfig.appUrl + '/access')
            .then((access) => {
            each(access.forms, (form) => {
                this.submissionAccess[form.name] = {};
                form.submissionAccess.forEach((subAccess) => {
                    this.submissionAccess[form.name][subAccess.type] = subAccess.roles;
                });
            });
            this.roles = access.roles;
            return access;
        })
            .catch((err) => {
            if (err === 'Token Expired' || err === 'Bad Token') {
                this.setUser(null);
            }
            this.roles = {};
            return null;
        });
        let currentUserPromise;
        if (this.config.oauth) {
            // Make a fix to the hash to remove starting "/" that angular might put there.
            if (window.location.hash && window.location.hash.match(/^#\/access_token/)) {
                history.pushState(null, null, window.location.hash.replace(/^#\/access_token/, '#access_token'));
            }
            // Initiate the SSO if they provide oauth settings.
            currentUserPromise = Formio.ssoInit(this.config.oauth.type, this.config.oauth.options);
        }
        else {
            currentUserPromise = Formio.currentUser(null, {
                ignoreCache: true
            });
        }
        this.userReady = currentUserPromise.then((user) => {
            this.setUser(user);
            return user;
        }).catch((err) => {
            this.setUser(null);
            throw err;
        });
        // Trigger we are redy when all promises have resolved.
        if (this.accessReady) {
            this.accessReady
                .then(() => this.projectReady)
                .then(() => this.userReady)
                .then(() => this.readyResolve(true))
                .catch((err) => this.readyReject(err));
        }
    }
    setUser(user) {
        const namespace = Formio.namespace || 'formio';
        if (user) {
            this.user = user;
            localStorage.setItem(`${namespace}AppUser`, JSON.stringify(user));
            this.setUserRoles();
            Formio.setUser(user);
        }
        else {
            this.user = null;
            this.is = {};
            localStorage.removeItem(`${namespace}AppUser`);
            Formio.clearCache();
            Formio.setUser(null);
        }
        this.authenticated = !!Formio.getToken();
        this.onUser.emit(this.user);
    }
    setUserRoles() {
        if (this.accessReady) {
            this.accessReady.then(() => {
                each(this.roles, (role, roleName) => {
                    if (this.user.roles.indexOf(role._id) !== -1) {
                        this.is[roleName] = true;
                    }
                });
            });
        }
    }
    logoutError() {
        this.setUser(null);
        const namespace = Formio.namespace || 'formio';
        localStorage.removeItem(`${namespace}Token`);
        this.onError.emit();
    }
    logout() {
        Formio.logout()
            .then(() => {
            this.setUser(null);
            const namespace = Formio.namespace || 'formio';
            if (localStorage.getItem(`${namespace}LogoutAuthUrl`)) {
                window.open(localStorage.getItem(`${namespace}LogoutAuthUrl`), null, 'width=1020,height=618');
                localStorage.removeItem(`${namespace}LogoutAuthUrl`);
            }
            localStorage.removeItem(`${namespace}Token`);
            this.onLogout.emit();
        })
            .catch(() => this.logoutError());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuthService, deps: [{ token: i1.FormioAppConfig }, { token: i2.FormioAuthConfig }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuthService });
}
export { FormioAuthService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FormioAuthService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAppConfig }, { type: i2.FormioAuthConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7QUFFcEMsTUFDYSxpQkFBaUI7SUE2Qm5CO0lBQ0E7SUE3QkYsSUFBSSxDQUFNO0lBQ1YsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUV0QixTQUFTLENBQVM7SUFDbEIsT0FBTyxDQUF1QjtJQUM5QixRQUFRLENBQXVCO0lBRS9CLFlBQVksQ0FBUztJQUNyQixVQUFVLENBQXVCO0lBQ2pDLE1BQU0sQ0FBdUI7SUFDN0IsT0FBTyxDQUFvQjtJQUUzQixhQUFhLENBQVM7SUFDdEIsV0FBVyxDQUF1QjtJQUVsQyxLQUFLLENBQW1CO0lBQ3hCLFlBQVksQ0FBTTtJQUNsQixXQUFXLENBQU07SUFFakIsWUFBWSxDQUFnQjtJQUM1QixXQUFXLENBQWdCO0lBQzNCLFNBQVMsQ0FBZ0I7SUFDekIsVUFBVSxHQUFRLEVBQUUsQ0FBQztJQUNyQixnQkFBZ0IsR0FBUSxFQUFFLENBQUM7SUFDM0IsS0FBSyxDQUFNO0lBQ1gsRUFBRSxHQUFRLEVBQUUsQ0FBQztJQUVwQixZQUNTLFNBQTBCLEVBQzFCLE1BQXdCO1FBRHhCLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBRS9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUMzQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQzdDO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7U0FDekU7UUFFRCxJQUFJLENBQUMsU0FBUztZQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFDckIsR0FBRztnQkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFlBQVk7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07Z0JBQ3JCLEdBQUc7Z0JBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFDckIsR0FBRztnQkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLE1BQVcsRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0NBQWdDO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxhQUFhLENBQUMsVUFBa0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBa0I7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsVUFBa0I7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDdEUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQ0QsR0FBUSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQ0YsQ0FBQztRQUVGLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUNsQzthQUNFLElBQUksQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBYyxFQUFFLEVBQUU7b0JBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUIsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFPLEVBQUU7WUFDbEIsSUFBSSxHQUFHLEtBQUssZUFBZSxJQUFJLEdBQUcsS0FBSyxXQUFXLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFBO1FBRUosSUFBSSxrQkFBZ0MsQ0FBQztRQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3JCLDhFQUE4RTtZQUM5RSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUMxRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDbEc7WUFFRCxtREFBbUQ7WUFDbkQsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEY7YUFBTTtZQUNMLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUM1QyxXQUFXLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixNQUFNLEdBQUcsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO1FBRUgsdURBQXVEO1FBQ3ZELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVztpQkFDYixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDN0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQzFCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsSUFBUztRQUNmLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO1FBQy9DLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxTQUFTLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQVMsRUFBRSxRQUFnQixFQUFFLEVBQUU7b0JBQy9DLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDNUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQzFCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQztRQUMvQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLE1BQU0sRUFBRTthQUNaLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO1lBQy9DLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsZUFBZSxDQUFDLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixDQUFDLENBQUM7Z0JBQzlGLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLGVBQWUsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsT0FBTyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQzt1R0E5TVUsaUJBQWlCOzJHQUFqQixpQkFBaUI7O1NBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aENvbmZpZyB9IGZyb20gJy4vYXV0aC5jb25maWcnO1xyXG5pbXBvcnQgeyBGb3JtaW9BcHBDb25maWcgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBnZXQsIGVhY2ggfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBGb3JtaW8gfSBmcm9tICdAZm9ybWlvL2pzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1pb0F1dGhTZXJ2aWNlIHtcclxuICBwdWJsaWMgdXNlcjogYW55O1xyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGVkID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBsb2dpbkZvcm06IHN0cmluZztcclxuICBwdWJsaWMgb25Mb2dpbjogRXZlbnRFbWl0dGVyPG9iamVjdD47XHJcbiAgcHVibGljIG9uTG9nb3V0OiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyRm9ybTogc3RyaW5nO1xyXG4gIHB1YmxpYyBvblJlZ2lzdGVyOiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBwdWJsaWMgb25Vc2VyOiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBwdWJsaWMgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT47XHJcblxyXG4gIHB1YmxpYyByZXNldFBhc3NGb3JtOiBzdHJpbmc7XHJcbiAgcHVibGljIG9uUmVzZXRQYXNzOiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuXHJcbiAgcHVibGljIHJlYWR5OiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIHB1YmxpYyByZWFkeVJlc29sdmU6IGFueTtcclxuICBwdWJsaWMgcmVhZHlSZWplY3Q6IGFueTtcclxuXHJcbiAgcHVibGljIHByb2plY3RSZWFkeT86IFByb21pc2U8YW55PjtcclxuICBwdWJsaWMgYWNjZXNzUmVhZHk/OiBQcm9taXNlPGFueT47XHJcbiAgcHVibGljIHVzZXJSZWFkeT86IFByb21pc2U8YW55PjtcclxuICBwdWJsaWMgZm9ybUFjY2VzczogYW55ID0ge307XHJcbiAgcHVibGljIHN1Ym1pc3Npb25BY2Nlc3M6IGFueSA9IHt9O1xyXG4gIHB1YmxpYyByb2xlczogYW55O1xyXG4gIHB1YmxpYyBpczogYW55ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGFwcENvbmZpZzogRm9ybWlvQXBwQ29uZmlnLFxyXG4gICAgcHVibGljIGNvbmZpZzogRm9ybWlvQXV0aENvbmZpZ1xyXG4gICkge1xyXG4gICAgdGhpcy51c2VyID0gbnVsbDtcclxuXHJcbiAgICBpZiAodGhpcy5hcHBDb25maWcgJiYgdGhpcy5hcHBDb25maWcuYXBwVXJsKSB7XHJcbiAgICAgIEZvcm1pby5zZXRCYXNlVXJsKHRoaXMuYXBwQ29uZmlnLmFwaVVybCk7XHJcbiAgICAgIEZvcm1pby5zZXRQcm9qZWN0VXJsKHRoaXMuYXBwQ29uZmlnLmFwcFVybCk7XHJcbiAgICAgIEZvcm1pby5mb3JtT25seSA9ICEhdGhpcy5hcHBDb25maWcuZm9ybU9ubHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGFuIEFwcENvbmZpZyB3aXRoaW4geW91ciBhcHBsaWNhdGlvbiEnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvZ2luRm9ybSA9XHJcbiAgICAgIHRoaXMuYXBwQ29uZmlnLmFwcFVybCArXHJcbiAgICAgICcvJyArXHJcbiAgICAgIGdldCh0aGlzLmNvbmZpZywgJ2xvZ2luLmZvcm0nLCAndXNlci9sb2dpbicpO1xyXG4gICAgdGhpcy5yZWdpc3RlckZvcm0gPVxyXG4gICAgICB0aGlzLmFwcENvbmZpZy5hcHBVcmwgK1xyXG4gICAgICAnLycgK1xyXG4gICAgICBnZXQodGhpcy5jb25maWcsICdyZWdpc3Rlci5mb3JtJywgJ3VzZXIvcmVnaXN0ZXInKTtcclxuICAgIHRoaXMucmVzZXRQYXNzRm9ybSA9XHJcbiAgICAgIHRoaXMuYXBwQ29uZmlnLmFwcFVybCArXHJcbiAgICAgICcvJyArXHJcbiAgICAgIGdldCh0aGlzLmNvbmZpZywgJ3JlZ2lzdGVyLmZvcm0nLCAncmVzZXRwYXNzJyk7XHJcbiAgICB0aGlzLm9uTG9naW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm9uTG9nb3V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5vblJlZ2lzdGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5vblVzZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgdGhpcy5yZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnksIHJlamVjdDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMucmVhZHlSZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgdGhpcy5yZWFkeVJlamVjdCA9IHJlamVjdDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlZ2lzdGVyIGZvciB0aGUgY29yZSBldmVudHMuXHJcbiAgICBGb3JtaW8uZXZlbnRzLm9uKCdmb3JtaW8uYmFkVG9rZW4nLCAoKSA9PiB0aGlzLmxvZ291dEVycm9yKCkpO1xyXG4gICAgRm9ybWlvLmV2ZW50cy5vbignZm9ybWlvLnNlc3Npb25FeHBpcmVkJywgKCkgPT4gdGhpcy5sb2dvdXRFcnJvcigpKTtcclxuICAgIGlmICghdGhpcy5jb25maWcuZGVsYXlBdXRoKSB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Mb2dpblN1Ym1pdChzdWJtaXNzaW9uOiBvYmplY3QpIHtcclxuICAgIHRoaXMuc2V0VXNlcihzdWJtaXNzaW9uKTtcclxuICAgIHRoaXMub25Mb2dpbi5lbWl0KHN1Ym1pc3Npb24pO1xyXG4gIH1cclxuXHJcbiAgb25SZWdpc3RlclN1Ym1pdChzdWJtaXNzaW9uOiBvYmplY3QpIHtcclxuICAgIHRoaXMuc2V0VXNlcihzdWJtaXNzaW9uKTtcclxuICAgIHRoaXMub25SZWdpc3Rlci5lbWl0KHN1Ym1pc3Npb24pO1xyXG4gIH1cclxuXHJcbiAgb25SZXNldFBhc3NTdWJtaXQoc3VibWlzc2lvbjogb2JqZWN0KSB7XHJcbiAgICB0aGlzLm9uUmVzZXRQYXNzLmVtaXQoc3VibWlzc2lvbik7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy5wcm9qZWN0UmVhZHkgPSBGb3JtaW8ubWFrZVN0YXRpY1JlcXVlc3QodGhpcy5hcHBDb25maWcuYXBwVXJsKS50aGVuKFxyXG4gICAgICAocHJvamVjdDogYW55KSA9PiB7XHJcbiAgICAgICAgZWFjaChwcm9qZWN0LmFjY2VzcywgKGFjY2VzczogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZvcm1BY2Nlc3NbYWNjZXNzLnR5cGVdID0gYWNjZXNzLnJvbGVzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICAoKTogYW55ID0+IHtcclxuICAgICAgICB0aGlzLmZvcm1BY2Nlc3MgPSB7fTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBHZXQgdGhlIGFjY2VzcyBmb3IgdGhpcyBwcm9qZWN0LlxyXG4gICAgdGhpcy5hY2Nlc3NSZWFkeSA9IEZvcm1pby5tYWtlU3RhdGljUmVxdWVzdChcclxuICAgICAgdGhpcy5hcHBDb25maWcuYXBwVXJsICsgJy9hY2Nlc3MnXHJcbiAgICApXHJcbiAgICAgIC50aGVuKChhY2Nlc3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGVhY2goYWNjZXNzLmZvcm1zLCAoZm9ybTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnN1Ym1pc3Npb25BY2Nlc3NbZm9ybS5uYW1lXSA9IHt9O1xyXG4gICAgICAgICAgZm9ybS5zdWJtaXNzaW9uQWNjZXNzLmZvckVhY2goKHN1YkFjY2VzczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWlzc2lvbkFjY2Vzc1tmb3JtLm5hbWVdW3N1YkFjY2Vzcy50eXBlXSA9IHN1YkFjY2Vzcy5yb2xlcztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucm9sZXMgPSBhY2Nlc3Mucm9sZXM7XHJcbiAgICAgICAgcmV0dXJuIGFjY2VzcztcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpOiBhbnkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIgPT09ICdUb2tlbiBFeHBpcmVkJyB8fCBlcnIgPT09ICdCYWQgVG9rZW4nKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFVzZXIobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm9sZXMgPSB7fTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSlcclxuXHJcbiAgICBsZXQgY3VycmVudFVzZXJQcm9taXNlOiBQcm9taXNlPGFueT47XHJcbiAgICBpZiAodGhpcy5jb25maWcub2F1dGgpIHtcclxuICAgICAgLy8gTWFrZSBhIGZpeCB0byB0aGUgaGFzaCB0byByZW1vdmUgc3RhcnRpbmcgXCIvXCIgdGhhdCBhbmd1bGFyIG1pZ2h0IHB1dCB0aGVyZS5cclxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoKC9eI1xcL2FjY2Vzc190b2tlbi8pKSB7XHJcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgvXiNcXC9hY2Nlc3NfdG9rZW4vLCAnI2FjY2Vzc190b2tlbicpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSW5pdGlhdGUgdGhlIFNTTyBpZiB0aGV5IHByb3ZpZGUgb2F1dGggc2V0dGluZ3MuXHJcbiAgICAgIGN1cnJlbnRVc2VyUHJvbWlzZSA9IEZvcm1pby5zc29Jbml0KHRoaXMuY29uZmlnLm9hdXRoLnR5cGUsIHRoaXMuY29uZmlnLm9hdXRoLm9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudFVzZXJQcm9taXNlID0gRm9ybWlvLmN1cnJlbnRVc2VyKG51bGwsIHtcclxuICAgICAgICBpZ25vcmVDYWNoZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVzZXJSZWFkeSA9IGN1cnJlbnRVc2VyUHJvbWlzZS50aGVuKCh1c2VyOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpO1xyXG4gICAgICByZXR1cm4gdXNlcjtcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgdGhpcy5zZXRVc2VyKG51bGwpO1xyXG4gICAgICB0aHJvdyBlcnI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUcmlnZ2VyIHdlIGFyZSByZWR5IHdoZW4gYWxsIHByb21pc2VzIGhhdmUgcmVzb2x2ZWQuXHJcbiAgICBpZiAodGhpcy5hY2Nlc3NSZWFkeSkge1xyXG4gICAgICB0aGlzLmFjY2Vzc1JlYWR5XHJcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wcm9qZWN0UmVhZHkpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy51c2VyUmVhZHkpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5yZWFkeVJlc29sdmUodHJ1ZSkpXHJcbiAgICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4gdGhpcy5yZWFkeVJlamVjdChlcnIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFVzZXIodXNlcjogYW55KSB7XHJcbiAgICBjb25zdCBuYW1lc3BhY2UgPSBGb3JtaW8ubmFtZXNwYWNlIHx8ICdmb3JtaW8nO1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7bmFtZXNwYWNlfUFwcFVzZXJgLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICAgIHRoaXMuc2V0VXNlclJvbGVzKCk7XHJcbiAgICAgIEZvcm1pby5zZXRVc2VyKHVzZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51c2VyID0gbnVsbDtcclxuICAgICAgdGhpcy5pcyA9IHt9O1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtuYW1lc3BhY2V9QXBwVXNlcmApO1xyXG4gICAgICBGb3JtaW8uY2xlYXJDYWNoZSgpO1xyXG4gICAgICBGb3JtaW8uc2V0VXNlcihudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSAhIUZvcm1pby5nZXRUb2tlbigpO1xyXG4gICAgdGhpcy5vblVzZXIuZW1pdCh0aGlzLnVzZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlclJvbGVzKCkge1xyXG4gICAgaWYgKHRoaXMuYWNjZXNzUmVhZHkpIHtcclxuICAgICAgdGhpcy5hY2Nlc3NSZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgICBlYWNoKHRoaXMucm9sZXMsIChyb2xlOiBhbnksIHJvbGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnVzZXIucm9sZXMuaW5kZXhPZihyb2xlLl9pZCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNbcm9sZU5hbWVdID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2dvdXRFcnJvcigpIHtcclxuICAgIHRoaXMuc2V0VXNlcihudWxsKTtcclxuICAgIGNvbnN0IG5hbWVzcGFjZSA9IEZvcm1pby5uYW1lc3BhY2UgfHwgJ2Zvcm1pbyc7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtuYW1lc3BhY2V9VG9rZW5gKTtcclxuICAgIHRoaXMub25FcnJvci5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICBGb3JtaW8ubG9nb3V0KClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0VXNlcihudWxsKTtcclxuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBGb3JtaW8ubmFtZXNwYWNlIHx8ICdmb3JtaW8nO1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtuYW1lc3BhY2V9TG9nb3V0QXV0aFVybGApKSB7XHJcbiAgICAgICAgICB3aW5kb3cub3Blbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtuYW1lc3BhY2V9TG9nb3V0QXV0aFVybGApLCBudWxsLCAnd2lkdGg9MTAyMCxoZWlnaHQ9NjE4Jyk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtuYW1lc3BhY2V9TG9nb3V0QXV0aFVybGApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtuYW1lc3BhY2V9VG9rZW5gKTtcclxuICAgICAgICB0aGlzLm9uTG9nb3V0LmVtaXQoKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKCgpID0+IHRoaXMubG9nb3V0RXJyb3IoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==