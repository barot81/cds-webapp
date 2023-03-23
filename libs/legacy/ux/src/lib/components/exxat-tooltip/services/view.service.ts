import {
    ApplicationRef,
    ComponentFactoryResolver,
    Injectable,
    Injector,
    TemplateRef,
    Type
} from '@angular/core';
import { TplRef, StringRef, CompRef, Content, isComponent, isString, isTemplateRef, ViewRef, CompViewOptions, TemplateViewOptions, _ViewOptions } from '../utils';

@Injectable({providedIn: 'any'})
export class ViewService {
    constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) { }

    createComponent<C>(component: Type<C>, options: CompViewOptions = {}) {
        return new CompRef<C>({
            component,
            vcr: options.vcr,
            injector: options.injector || this.injector,
            appRef: this.appRef,
            resolver: this.resolver,
        });
    }

    createTemplate<C>(tpl: TemplateRef<C>, options: TemplateViewOptions = {}) {
        return new TplRef({
            vcr: options.vcr,
            appRef: this.appRef,
            tpl,
            context: options.context,
        });
    }

    createView(content: Content, viewOptions: _ViewOptions & CompViewOptions & TemplateViewOptions = {}): ViewRef {
        if (isTemplateRef(content)) {
            return this.createTemplate(content, viewOptions);
        } else if (isComponent(content)) {
            return this.createComponent(content, viewOptions);
        } else if (isString(content)) {
            return new StringRef(content);
        } else {
            throw 'Type of content is not supported';
        }
    }
}
