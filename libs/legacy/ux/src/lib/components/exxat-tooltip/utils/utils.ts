import { Observable } from 'rxjs';
import { coerceElement, TippyElement } from './types';

declare const ResizeObserver: any;

let supportsIntersectionObserver = false;
let supportsResizeObserver = false;

if (typeof window !== 'undefined') {
    supportsIntersectionObserver = 'IntersectionObserver' in window;
    supportsResizeObserver = 'ResizeObserver' in window;
}

export function inView(
    host: TippyElement,
    options: IntersectionObserverInit = {
        root: null,
        threshold: 0.3
    }
) {
    const element = coerceElement(host);

    return new Observable(subscriber => {
        if (!supportsIntersectionObserver) {
            subscriber.next();
            subscriber.complete();
            return;
        }

        const observer = new IntersectionObserver(entries => {
            // Several changes may occur in the same tick, we want to check the latest entry state.
            const entry = entries[entries.length - 1];
            if (entry.isIntersecting) {
                subscriber.next();
                subscriber.complete();
            }
        }, options);

        observer.observe(element);

        return () => observer.disconnect();
    });
}

export function dimensionsChanges(target: HTMLElement) {
    return resizeObserverStrategy(target);
}

function resizeObserverStrategy(target: HTMLElement): Observable<boolean> {
    return new Observable(subscriber => {
        if (!supportsResizeObserver) {
            subscriber.next();
            subscriber.complete();
            return;
        }

        const observer = new ResizeObserver(() => subscriber.next(true));
        observer.observe(target);
        return () => observer.disconnect();
    });
}

export function onlyTippyProps(allProps: any) {
    const tippyProps = {};

    const ownProps = [
        'variations',
        'useHostWidth',
        'defaultVariation',
        'beforeRender',
        'lazy',
        'variation',
        'isEnabled',
        'className',
        'onlyTextOverflow',
        'data',
        'content',
        'hideOnEscape',
        'customHost'
    ];

    Object.keys(allProps).forEach(prop => {
        if (!ownProps.includes(prop)) {
            tippyProps[prop] = allProps[prop];
        }
    });

    return tippyProps;
}

export function normalizeClassName(className: string | string[]): string[] {
    const classes = isString(className) ? className.split(' ') : className;

    return classes.map(klass => klass?.trim()).filter(Boolean);
}

function isString(value: unknown): value is string {
    return typeof value === 'string';
}
