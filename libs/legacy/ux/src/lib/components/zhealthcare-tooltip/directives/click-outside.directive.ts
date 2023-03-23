/* The MIT License (MIT)

Copyright (c) 2016 Eugene Cheung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

import {
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Injectable,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    SimpleChanges,
    NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({providedIn: 'any'})
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {

    @Input() clickOutsideEnabled: boolean = true;

    @Input() attachOutsideOnClick: boolean = false;
    @Input() delayClickOutsideInit: boolean = false;
    @Input() emitOnBlur: boolean = false;

    @Input() exclude: string = '';
    @Input() excludeBeforeClick: boolean = false;

    @Input() clickOutsideEvents: string = '';

    @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

    private _nodesExcluded: Array<HTMLElement> = [];
    private _events: Array<string> = ['click'];

    constructor(
        private _el: ElementRef,
        private _ngZone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object) {
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
        this._onWindowBlur = this._onWindowBlur.bind(this);
    }

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) { return; }

        this._init();
    }

    ngOnDestroy() {
        if (!isPlatformBrowser(this.platformId)) { return; }

        this._removeClickOutsideListener();
        this._removeAttachOutsideOnClickListener();
        this._removeWindowBlurListener();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!isPlatformBrowser(this.platformId)) { return; }

        if (changes['attachOutsideOnClick'] || changes['exclude'] || changes['emitOnBlur']) {
            this._init();
        }
    }

    private _init() {
        if (this.clickOutsideEvents !== '') {
            this._events = this.clickOutsideEvents.split(',').map(e => e.trim());
        }

        this._excludeCheck();

        if (this.attachOutsideOnClick) {
            this._initAttachOutsideOnClickListener();
        } else {
            this._initOnClickBody();
        }

        if (this.emitOnBlur) {
            this._initWindowBlurListener();
        }
    }

    private _initOnClickBody() {
        if (this.delayClickOutsideInit) {
            setTimeout(this._initClickOutsideListener.bind(this));
        } else {
            this._initClickOutsideListener();
        }
    }

    private _excludeCheck() {
        if (this.exclude) {
            try {
                const nodes = Array.from(document.querySelectorAll(this.exclude)) as Array<HTMLElement>;
                if (nodes) {
                    this._nodesExcluded = nodes;
                }
            } catch (err) {
                console.error('[ng-click-outside] Check your exclude selector syntax.', err);
            }
        }
    }

    private _onClickBody(ev: Event) {
        if (!this.clickOutsideEnabled) { return; }

        if (this.excludeBeforeClick) {
            this._excludeCheck();
        }

        if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
            this._emit(ev);

            if (this.attachOutsideOnClick) {
                this._removeClickOutsideListener();
            }
        }
    }

    private _onWindowBlur(ev: Event) {
        setTimeout(() => {
            if (!document.hidden) {
                this._emit(ev);
            }
        });
    }

    private _emit(ev: Event) {
        if (!this.clickOutsideEnabled) { return; }

        this._ngZone.run(() => this.clickOutside.emit(ev));
    }

    private _shouldExclude(target): boolean {
        for (let excludedNode of this._nodesExcluded) {
            if (excludedNode.contains(target)) {
                return true;
            }
        }

        return false;
    }

    private _initClickOutsideListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => document.addEventListener(e, this._onClickBody));
        });
    }

    private _removeClickOutsideListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => document.removeEventListener(e, this._onClickBody));
        });
    }

    private _initAttachOutsideOnClickListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
        });
    }

    private _removeAttachOutsideOnClickListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
        });
    }

    private _initWindowBlurListener() {
        this._ngZone.runOutsideAngular(() => {
            window.addEventListener('blur', this._onWindowBlur);
        });
    }

    private _removeWindowBlurListener() {
        this._ngZone.runOutsideAngular(() => {
            window.removeEventListener('blur', this._onWindowBlur);
        });
    }

}
