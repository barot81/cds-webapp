import { Instance, Props } from 'tippy.js';
import { ElementRef, InjectionToken, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';

export interface _ViewOptions {
    vcr?: ViewContainerRef | undefined;
}

export interface CompViewOptions extends _ViewOptions {
    injector?: Injector | undefined;
}

export interface TemplateViewOptions extends _ViewOptions {
    context?: Record<string, any> | undefined;
}

export type ViewOptions = _ViewOptions & CompViewOptions & TemplateViewOptions;

export interface CreateOptions extends Partial<TippyProps>, ViewOptions {
    variation: string;
    className: string | string[];
}

export type NgChanges<Component extends object, Props = ExcludeFunctions<Component>> = {
    [Key in keyof Props]: {
        previousValue: Props[Key];
        currentValue: Props[Key];
        firstChange: boolean;
        isFirstChange(): boolean;
    };
};

export type MarkFunctionPropertyNames<Component> = {
    [Key in keyof Component]: Component[Key] extends Function ? never : Key;
}[keyof Component];

export type ExcludeFunctions<T> = Pick<T, MarkFunctionPropertyNames<T>>;

export const TIPPY_CONFIG = new InjectionToken<Partial<TippyConfig>>('Tippy config', {
    providedIn: 'root',
    factory() {
        return {};
    }
});

export const TIPPY_REF = new InjectionToken('TIPPY_REF');

export type TippyInstance = Instance;

export type TippyProps = Props;
export interface TippyConfig extends TippyProps {
    variations: Record<string, Partial<TippyProps>>;
    defaultVariation: keyof TippyConfig['variations'];
    beforeRender?: (text: string) => string;
}

export function coerceElement(element: TippyElement) {
    return element instanceof ElementRef ? element.nativeElement : element;
}

export type TippyElement = ElementRef | Element;

export interface TippyTooltipOptions extends TippyProps {
    'content-type'?: 'string' | 'component' | 'template';
    'max-width'?: number;
    'width'?: number;
    'pointerEvents'?: 'auto' | 'none';
    'show-delay'?: number;
    'hide-delay'?: number;
}

export interface ViewRef {
    getElement(): Element | string;

    detectChanges(): void;

    destroy(): void;
}

export type ExcludeFunctionPropertyNames<T> = {
    [Key in keyof T]: T[Key] extends Function ? never : Key;
}[keyof T];

export type Content = string | TemplateRef<any> | Type<any>;

export function isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
}

export function isComponent(value: any): value is Type<any> {
    return typeof value === 'function';
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}