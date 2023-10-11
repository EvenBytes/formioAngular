// @ts-nocheck
import { Components, Utils as FormioUtils } from '@formio/js';
import { clone, isNil, isArray } from 'lodash';
const BaseInputComponent = Components.components.input;
const TextfieldComponent = Components.components.textfield;
export function createCustomFormioComponent(customComponentOptions) {
    return class CustomComponent extends BaseInputComponent {
        component;
        static editForm = customComponentOptions.editForm || TextfieldComponent.editForm;
        id = FormioUtils.getRandomComponentId();
        type = customComponentOptions.type;
        _customAngularElement;
        static schema() {
            return BaseInputComponent.schema({
                ...customComponentOptions.schema,
                type: customComponentOptions.type,
            });
        }
        get defaultSchema() {
            return CustomComponent.schema();
        }
        get emptyValue() {
            return customComponentOptions.emptyValue || null;
        }
        static get builderInfo() {
            return {
                title: customComponentOptions.title,
                group: customComponentOptions.group,
                icon: customComponentOptions.icon,
                weight: customComponentOptions.weight,
                documentation: customComponentOptions.documentation,
                schema: CustomComponent.schema(),
            };
        }
        constructor(component, options, data) {
            super(component, {
                ...options,
                sanitizeConfig: {
                    addTags: [customComponentOptions.selector],
                },
            }, data);
            this.component = component;
            if (customComponentOptions.extraValidators) {
                this.validators = this.validators.concat(customComponentOptions.extraValidators);
            }
        }
        elementInfo() {
            const info = super.elementInfo();
            info.type = customComponentOptions.selector;
            info.changeEvent = customComponentOptions.changeEvent || 'valueChange';
            info.attr = {
                ...info.attr,
                class: info.attr.class.replace('form-control', 'form-control-custom-field') // remove the form-control class as the custom angular component may look different
            };
            return info;
        }
        get inputInfo() {
            const info = {
                id: this.key,
                ...this.elementInfo()
            };
            return info;
        }
        renderElement(value, index) {
            const info = this.inputInfo;
            return this.renderTemplate(customComponentOptions.template || 'input', {
                input: info,
                value,
                index
            });
        }
        attach(element) {
            let superAttach = super.attach(element);
            this._customAngularElement = element.querySelector(customComponentOptions.selector);
            // Bind the custom options and the validations to the Angular component's inputs (flattened)
            if (this._customAngularElement) {
                // To make sure we have working input in IE...
                // IE doesn't render it properly if it's not visible on the screen
                // due to the whole structure applied via innerHTML to the parent
                // so we need to use appendChild
                if (!this._customAngularElement.getAttribute('ng-version')) {
                    this._customAngularElement.removeAttribute('ref');
                    const newCustomElement = document.createElement(customComponentOptions.selector);
                    newCustomElement.setAttribute('ref', 'input');
                    Object.keys(this.inputInfo.attr).forEach((attr) => {
                        newCustomElement.setAttribute(attr, this.inputInfo.attr[attr]);
                    });
                    this._customAngularElement.appendChild(newCustomElement);
                    this._customAngularElement = newCustomElement;
                    superAttach = super.attach(element);
                }
                // Bind customOptions
                for (const key in this.component.customOptions) {
                    if (this.component.customOptions.hasOwnProperty(key)) {
                        this._customAngularElement[key] = this.component.customOptions[key];
                    }
                }
                // Bind validate options
                for (const key in this.component.validate) {
                    if (this.component.validate.hasOwnProperty(key)) {
                        this._customAngularElement[key] = this.component.validate[key];
                    }
                }
                // Bind options explicitly set
                const fieldOptions = customComponentOptions.fieldOptions;
                if (isArray(fieldOptions) && fieldOptions.length > 0) {
                    for (const key in fieldOptions) {
                        if (fieldOptions.hasOwnProperty(key)) {
                            this._customAngularElement[fieldOptions[key]] = this.component[fieldOptions[key]];
                        }
                    }
                }
                // Attach event listener for emit event
                this._customAngularElement.addEventListener('formioEvent', (event) => {
                    this.emit(event.detail.eventName, {
                        ...event.detail.data,
                        component: this.component
                    });
                });
                // Ensure we bind the value (if it isn't a multiple-value component with no wrapper)
                if (!this._customAngularElement.value && !this.component.disableMultiValueWrapper) {
                    this.restoreValue();
                }
            }
            return superAttach;
        }
        // Add extra option to support multiple value (e.g. datagrid) with single angular component (disableMultiValueWrapper)
        useWrapper() {
            return this.component.hasOwnProperty('multiple') && this.component.multiple && !this.component.disableMultiValueWrapper;
        }
        get defaultValue() {
            let defaultValue = this.emptyValue;
            // handle falsy default value
            if (!isNil(this.component.defaultValue)) {
                defaultValue = this.component.defaultValue;
            }
            if (this.component.customDefaultValue && !this.options.preview) {
                defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
            }
            return clone(defaultValue);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWN1c3RvbS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY3VzdG9tLWNvbXBvbmVudC9jcmVhdGUtY3VzdG9tLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxFQUFlLFVBQVUsRUFBMkIsS0FBSyxJQUFJLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVwRyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFL0MsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUN2RCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0FBRTNELE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxzQkFBaUQ7SUFDM0YsT0FBTyxNQUFNLGVBQWdCLFNBQVEsa0JBQWtCO1FBZ0NsQztRQS9CbkIsTUFBTSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxRQUFRLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDO1FBQ2pGLEVBQUUsR0FBRyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN4QyxJQUFJLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDO1FBQ25DLHFCQUFxQixDQUFzQjtRQUUzQyxNQUFNLENBQUMsTUFBTTtZQUNYLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDO2dCQUMvQixHQUFHLHNCQUFzQixDQUFDLE1BQU07Z0JBQ2hDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxJQUFJO2FBQ2xDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLGFBQWE7WUFDZixPQUFPLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQyxDQUFDO1FBRUQsSUFBSSxVQUFVO1lBQ1osT0FBTyxz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QUksQ0FBQyxVQUFVLENBQUM7WUFFbkMsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDdkMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2FBQzVDO1lBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQzlELFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUNqQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFDYixPQUFPLENBQ1IsQ0FBQzthQUNIO1lBRUQsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0IsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLW5vY2hlY2tcclxuaW1wb3J0IHsgQnVpbGRlckluZm8sIENvbXBvbmVudHMsIEV4dGVuZGVkQ29tcG9uZW50U2NoZW1hLCBVdGlscyBhcyBGb3JtaW9VdGlscyB9IGZyb20gJ0Bmb3JtaW8vanMnO1xyXG5pbXBvcnQgeyBGb3JtaW9DdXN0b21Db21wb25lbnRJbmZvLCBGb3JtaW9DdXN0b21FbGVtZW50LCBGb3JtaW9FdmVudCB9IGZyb20gJy4uL2VsZW1lbnRzLmNvbW1vbic7XHJcbmltcG9ydCB7IGNsb25lLCBpc05pbCwgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG5jb25zdCBCYXNlSW5wdXRDb21wb25lbnQgPSBDb21wb25lbnRzLmNvbXBvbmVudHMuaW5wdXQ7XHJcbmNvbnN0IFRleHRmaWVsZENvbXBvbmVudCA9IENvbXBvbmVudHMuY29tcG9uZW50cy50ZXh0ZmllbGQ7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ3VzdG9tRm9ybWlvQ29tcG9uZW50KGN1c3RvbUNvbXBvbmVudE9wdGlvbnM6IEZvcm1pb0N1c3RvbUNvbXBvbmVudEluZm8pIHtcclxuICByZXR1cm4gY2xhc3MgQ3VzdG9tQ29tcG9uZW50IGV4dGVuZHMgQmFzZUlucHV0Q29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBlZGl0Rm9ybSA9IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuZWRpdEZvcm0gfHwgVGV4dGZpZWxkQ29tcG9uZW50LmVkaXRGb3JtO1xyXG4gICAgaWQgPSBGb3JtaW9VdGlscy5nZXRSYW5kb21Db21wb25lbnRJZCgpO1xyXG4gICAgdHlwZSA9IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMudHlwZTtcclxuICAgIF9jdXN0b21Bbmd1bGFyRWxlbWVudDogRm9ybWlvQ3VzdG9tRWxlbWVudDtcclxuXHJcbiAgICBzdGF0aWMgc2NoZW1hKCkge1xyXG4gICAgICByZXR1cm4gQmFzZUlucHV0Q29tcG9uZW50LnNjaGVtYSh7XHJcbiAgICAgICAgLi4uY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5zY2hlbWEsXHJcbiAgICAgICAgdHlwZTogY3VzdG9tQ29tcG9uZW50T3B0aW9ucy50eXBlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdFNjaGVtYSgpIHtcclxuICAgICAgcmV0dXJuIEN1c3RvbUNvbXBvbmVudC5zY2hlbWEoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZW1wdHlWYWx1ZSgpIHtcclxuICAgICAgcmV0dXJuIGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuZW1wdHlWYWx1ZSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgYnVpbGRlckluZm8oKTogQnVpbGRlckluZm8ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiBjdXN0b21Db21wb25lbnRPcHRpb25zLnRpdGxlLFxyXG4gICAgICAgIGdyb3VwOiBjdXN0b21Db21wb25lbnRPcHRpb25zLmdyb3VwLFxyXG4gICAgICAgIGljb246IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuaWNvbixcclxuICAgICAgICB3ZWlnaHQ6IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMud2VpZ2h0LFxyXG4gICAgICAgIGRvY3VtZW50YXRpb246IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuZG9jdW1lbnRhdGlvbixcclxuICAgICAgICBzY2hlbWE6IEN1c3RvbUNvbXBvbmVudC5zY2hlbWEoKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBFeHRlbmRlZENvbXBvbmVudFNjaGVtYSwgb3B0aW9uczogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgc3VwZXIoY29tcG9uZW50LCB7XHJcbiAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICBzYW5pdGl6ZUNvbmZpZzoge1xyXG4gICAgICAgICAgYWRkVGFnczogW2N1c3RvbUNvbXBvbmVudE9wdGlvbnMuc2VsZWN0b3JdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIGRhdGEpO1xyXG5cclxuICAgICAgaWYgKGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuZXh0cmFWYWxpZGF0b3JzKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3JzID0gdGhpcy52YWxpZGF0b3JzLmNvbmNhdChjdXN0b21Db21wb25lbnRPcHRpb25zLmV4dHJhVmFsaWRhdG9ycyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50SW5mbygpIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHN1cGVyLmVsZW1lbnRJbmZvKCk7XHJcbiAgICAgIGluZm8udHlwZSA9IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuc2VsZWN0b3I7XHJcbiAgICAgIGluZm8uY2hhbmdlRXZlbnQgPSBjdXN0b21Db21wb25lbnRPcHRpb25zLmNoYW5nZUV2ZW50IHx8ICd2YWx1ZUNoYW5nZSc7XHJcbiAgICAgIGluZm8uYXR0ciA9IHtcclxuICAgICAgICAuLi5pbmZvLmF0dHIsXHJcbiAgICAgICAgY2xhc3M6IGluZm8uYXR0ci5jbGFzcy5yZXBsYWNlKCdmb3JtLWNvbnRyb2wnLCAnZm9ybS1jb250cm9sLWN1c3RvbS1maWVsZCcpIC8vIHJlbW92ZSB0aGUgZm9ybS1jb250cm9sIGNsYXNzIGFzIHRoZSBjdXN0b20gYW5ndWxhciBjb21wb25lbnQgbWF5IGxvb2sgZGlmZmVyZW50XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dEluZm8oKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMua2V5LFxyXG4gICAgICAgIC4uLnRoaXMuZWxlbWVudEluZm8oKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckVsZW1lbnQodmFsdWU6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICBjb25zdCBpbmZvID0gdGhpcy5pbnB1dEluZm87XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRlbXBsYXRlKGN1c3RvbUNvbXBvbmVudE9wdGlvbnMudGVtcGxhdGUgfHwgJ2lucHV0Jywge1xyXG4gICAgICAgIGlucHV0OiBpbmZvLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIGluZGV4XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICBsZXQgc3VwZXJBdHRhY2ggPSBzdXBlci5hdHRhY2goZWxlbWVudCk7XHJcblxyXG4gICAgICB0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihjdXN0b21Db21wb25lbnRPcHRpb25zLnNlbGVjdG9yKTtcclxuXHJcbiAgICAgIC8vIEJpbmQgdGhlIGN1c3RvbSBvcHRpb25zIGFuZCB0aGUgdmFsaWRhdGlvbnMgdG8gdGhlIEFuZ3VsYXIgY29tcG9uZW50J3MgaW5wdXRzIChmbGF0dGVuZWQpXHJcbiAgICAgIGlmICh0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudCkge1xyXG4gICAgICAgIC8vIFRvIG1ha2Ugc3VyZSB3ZSBoYXZlIHdvcmtpbmcgaW5wdXQgaW4gSUUuLi5cclxuICAgICAgICAvLyBJRSBkb2Vzbid0IHJlbmRlciBpdCBwcm9wZXJseSBpZiBpdCdzIG5vdCB2aXNpYmxlIG9uIHRoZSBzY3JlZW5cclxuICAgICAgICAvLyBkdWUgdG8gdGhlIHdob2xlIHN0cnVjdHVyZSBhcHBsaWVkIHZpYSBpbm5lckhUTUwgdG8gdGhlIHBhcmVudFxyXG4gICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gdXNlIGFwcGVuZENoaWxkXHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXZlcnNpb24nKSkge1xyXG4gICAgICAgICAgdGhpcy5fY3VzdG9tQW5ndWxhckVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyZWYnKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBuZXdDdXN0b21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjdXN0b21Db21wb25lbnRPcHRpb25zLnNlbGVjdG9yKSBhcyBGb3JtaW9DdXN0b21FbGVtZW50O1xyXG5cclxuICAgICAgICAgIG5ld0N1c3RvbUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWYnLCAnaW5wdXQnKTtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW5wdXRJbmZvLmF0dHIpLmZvckVhY2goKGF0dHI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBuZXdDdXN0b21FbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCB0aGlzLmlucHV0SW5mby5hdHRyW2F0dHJdKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50LmFwcGVuZENoaWxkKG5ld0N1c3RvbUVsZW1lbnQpO1xyXG4gICAgICAgICAgdGhpcy5fY3VzdG9tQW5ndWxhckVsZW1lbnQgPSBuZXdDdXN0b21FbGVtZW50O1xyXG5cclxuICAgICAgICAgIHN1cGVyQXR0YWNoID0gc3VwZXIuYXR0YWNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQmluZCBjdXN0b21PcHRpb25zXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb21wb25lbnQuY3VzdG9tT3B0aW9ucykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50LmN1c3RvbU9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudFtrZXldID0gdGhpcy5jb21wb25lbnQuY3VzdG9tT3B0aW9uc1trZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCaW5kIHZhbGlkYXRlIG9wdGlvbnNcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbXBvbmVudC52YWxpZGF0ZSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50LnZhbGlkYXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tQW5ndWxhckVsZW1lbnRba2V5XSA9IHRoaXMuY29tcG9uZW50LnZhbGlkYXRlW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEJpbmQgb3B0aW9ucyBleHBsaWNpdGx5IHNldFxyXG4gICAgICAgIGNvbnN0IGZpZWxkT3B0aW9ucyA9IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuZmllbGRPcHRpb25zO1xyXG4gICAgICAgIGlmIChpc0FycmF5KGZpZWxkT3B0aW9ucykgJiYgZmllbGRPcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkT3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoZmllbGRPcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudFtmaWVsZE9wdGlvbnNba2V5XV0gPSB0aGlzLmNvbXBvbmVudFtmaWVsZE9wdGlvbnNba2V5XV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBldmVudCBsaXN0ZW5lciBmb3IgZW1pdCBldmVudFxyXG4gICAgICAgIHRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Zvcm1pb0V2ZW50JywgKGV2ZW50OiBDdXN0b21FdmVudDxGb3JtaW9FdmVudD4pID0+IHtcclxuICAgICAgICAgIHRoaXMuZW1pdChldmVudC5kZXRhaWwuZXZlbnROYW1lLCB7XHJcbiAgICAgICAgICAgIC4uLmV2ZW50LmRldGFpbC5kYXRhLFxyXG4gICAgICAgICAgICBjb21wb25lbnQ6IHRoaXMuY29tcG9uZW50XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW5zdXJlIHdlIGJpbmQgdGhlIHZhbHVlIChpZiBpdCBpc24ndCBhIG11bHRpcGxlLXZhbHVlIGNvbXBvbmVudCB3aXRoIG5vIHdyYXBwZXIpXHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudC52YWx1ZSAmJiAhdGhpcy5jb21wb25lbnQuZGlzYWJsZU11bHRpVmFsdWVXcmFwcGVyKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc3RvcmVWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN1cGVyQXR0YWNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBleHRyYSBvcHRpb24gdG8gc3VwcG9ydCBtdWx0aXBsZSB2YWx1ZSAoZS5nLiBkYXRhZ3JpZCkgd2l0aCBzaW5nbGUgYW5ndWxhciBjb21wb25lbnQgKGRpc2FibGVNdWx0aVZhbHVlV3JhcHBlcilcclxuICAgIHVzZVdyYXBwZXIoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5oYXNPd25Qcm9wZXJ0eSgnbXVsdGlwbGUnKSAmJiB0aGlzLmNvbXBvbmVudC5tdWx0aXBsZSAmJiAhdGhpcy5jb21wb25lbnQuZGlzYWJsZU11bHRpVmFsdWVXcmFwcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0VmFsdWUoKSB7XHJcbiAgICAgIGxldCBkZWZhdWx0VmFsdWUgPSB0aGlzLmVtcHR5VmFsdWU7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgZmFsc3kgZGVmYXVsdCB2YWx1ZVxyXG4gICAgICBpZiAoIWlzTmlsKHRoaXMuY29tcG9uZW50LmRlZmF1bHRWYWx1ZSkpIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmNvbXBvbmVudC5kZWZhdWx0VmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudC5jdXN0b21EZWZhdWx0VmFsdWUgJiYgIXRoaXMub3B0aW9ucy5wcmV2aWV3KSB7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlID0gdGhpcy5ldmFsdWF0ZShcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LmN1c3RvbURlZmF1bHRWYWx1ZSxcclxuICAgICAgICAgIHsgdmFsdWU6ICcnIH0sXHJcbiAgICAgICAgICAndmFsdWUnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNsb25lKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=