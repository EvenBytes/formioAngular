import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
class ParseHtmlContentPipe {
    /*
      Some messages that are come from formiojs have hex codes. So the main aim of this pipe is transform this messages to html.
      And then render in template.
    */
    transform(content) {
        const parsedContent = new DOMParser().parseFromString(content, 'text/html').body.childNodes[0];
        return parsedContent?.textContent;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ParseHtmlContentPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: ParseHtmlContentPipe, name: "parseHtmlContent", pure: false });
}
export { ParseHtmlContentPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ParseHtmlContentPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'parseHtmlContent', pure: false }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtaHRtbC1jb250ZW50LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY29tcG9uZW50cy9hbGVydHMvcGFyc2UtaHRtbC1jb250ZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBRXBELE1BQ2Esb0JBQW9CO0lBRS9COzs7TUFHRTtJQUNGLFNBQVMsQ0FBQyxPQUFPO1FBQ2YsTUFBTSxhQUFhLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0YsT0FBTyxhQUFhLEVBQUUsV0FBVyxDQUFDO0lBQ3BDLENBQUM7dUdBVlUsb0JBQW9CO3FHQUFwQixvQkFBb0I7O1NBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7IG5hbWU6ICdwYXJzZUh0bWxDb250ZW50JywgcHVyZTogZmFsc2UgfSlcclxuZXhwb3J0IGNsYXNzIFBhcnNlSHRtbENvbnRlbnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIC8qXHJcbiAgICBTb21lIG1lc3NhZ2VzIHRoYXQgYXJlIGNvbWUgZnJvbSBmb3JtaW9qcyBoYXZlIGhleCBjb2Rlcy4gU28gdGhlIG1haW4gYWltIG9mIHRoaXMgcGlwZSBpcyB0cmFuc2Zvcm0gdGhpcyBtZXNzYWdlcyB0byBodG1sLlxyXG4gICAgQW5kIHRoZW4gcmVuZGVyIGluIHRlbXBsYXRlLlxyXG4gICovXHJcbiAgdHJhbnNmb3JtKGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IHBhcnNlZENvbnRlbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGNvbnRlbnQsICd0ZXh0L2h0bWwnKS5ib2R5LmNoaWxkTm9kZXNbMF07XHJcblxyXG4gICAgcmV0dXJuIHBhcnNlZENvbnRlbnQ/LnRleHRDb250ZW50O1xyXG4gIH1cclxufVxyXG4iXX0=