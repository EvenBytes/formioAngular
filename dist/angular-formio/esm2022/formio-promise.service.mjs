import { FormioService } from './formio.service';
export class FormioPromiseService {
    url;
    options;
    formioService;
    constructor(url, options) {
        this.url = url;
        this.options = options;
        this.formioService = new FormioService(url, options);
    }
    saveForm(form, options) {
        return this.formioService.saveForm(form, options).toPromise();
    }
    loadForm(query, options) {
        return this.formioService.loadForm(query, options).toPromise();
    }
    loadSubmission(query, options) {
        return this.formioService.loadSubmission(query, options).toPromise();
    }
    userPermissions(user, form, submission) {
        return this.formioService.userPermissions(user, form, submission).toPromise();
    }
    deleteSubmission(data, options) {
        return this.formioService.deleteSubmission(data, options).toPromise();
    }
    loadForms(query, options) {
        return this.formioService.loadForms(query, options).toPromise();
    }
    saveSubmission(submission, options) {
        return this.formioService.saveSubmission(submission, options).toPromise();
    }
    loadSubmissions(query, options) {
        return this.formioService.loadSubmissions(query, options).toPromise();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLXByb21pc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3NyYy9mb3JtaW8tcHJvbWlzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRCxNQUFNLE9BQU8sb0JBQW9CO0lBR1o7SUFBb0I7SUFGL0IsYUFBYSxDQUFnQjtJQUVyQyxZQUFtQixHQUFXLEVBQVMsT0FBZ0I7UUFBcEMsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFnQixFQUFFLE9BQWE7UUFDdEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFXLEVBQUUsT0FBYTtRQUNqQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBQ0QsY0FBYyxDQUFDLEtBQVcsRUFBRSxPQUFhO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZFLENBQUM7SUFDRCxlQUFlLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxVQUFlO1FBQ25ELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoRixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsSUFBVSxFQUFFLE9BQWE7UUFDeEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQVUsRUFBRSxPQUFhO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFDRCxjQUFjLENBQUMsVUFBYyxFQUFFLE9BQWE7UUFDMUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUUsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFXLEVBQUUsT0FBYTtRQUN4QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEZvcm1pb1NlcnZpY2UgfSBmcm9tICcuL2Zvcm1pby5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybWlvRm9ybSB9IGZyb20gJy4vZm9ybWlvLmNvbW1vbic7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybWlvUHJvbWlzZVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgZm9ybWlvU2VydmljZTogRm9ybWlvU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHVybDogc3RyaW5nLCBwdWJsaWMgb3B0aW9ucz86IG9iamVjdCkge1xyXG4gICAgdGhpcy5mb3JtaW9TZXJ2aWNlID0gbmV3IEZvcm1pb1NlcnZpY2UodXJsLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHNhdmVGb3JtKGZvcm06IEZvcm1pb0Zvcm0sIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWlvU2VydmljZS5zYXZlRm9ybShmb3JtLCBvcHRpb25zKS50b1Byb21pc2UoKTtcclxuICB9XHJcbiAgbG9hZEZvcm0ocXVlcnk/OiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWlvU2VydmljZS5sb2FkRm9ybShxdWVyeSwgb3B0aW9ucykudG9Qcm9taXNlKCk7XHJcbiAgfVxyXG4gIGxvYWRTdWJtaXNzaW9uKHF1ZXJ5PzogYW55LCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1pb1NlcnZpY2UubG9hZFN1Ym1pc3Npb24ocXVlcnksIG9wdGlvbnMpLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuICB1c2VyUGVybWlzc2lvbnModXNlcjogYW55LCBmb3JtOiBhbnksIHN1Ym1pc3Npb246IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5mb3JtaW9TZXJ2aWNlLnVzZXJQZXJtaXNzaW9ucyh1c2VyLCBmb3JtLCBzdWJtaXNzaW9uKS50b1Byb21pc2UoKTtcclxuICB9XHJcbiAgZGVsZXRlU3VibWlzc2lvbihkYXRhPzogYW55LCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1pb1NlcnZpY2UuZGVsZXRlU3VibWlzc2lvbihkYXRhLCBvcHRpb25zKS50b1Byb21pc2UoKTtcclxuICB9XHJcbiAgbG9hZEZvcm1zKHF1ZXJ5OiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWlvU2VydmljZS5sb2FkRm9ybXMocXVlcnksIG9wdGlvbnMpLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuICBzYXZlU3VibWlzc2lvbihzdWJtaXNzaW9uOiB7fSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5mb3JtaW9TZXJ2aWNlLnNhdmVTdWJtaXNzaW9uKHN1Ym1pc3Npb24sIG9wdGlvbnMpLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuICBsb2FkU3VibWlzc2lvbnMocXVlcnk/OiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWlvU2VydmljZS5sb2FkU3VibWlzc2lvbnMocXVlcnksIG9wdGlvbnMpLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=