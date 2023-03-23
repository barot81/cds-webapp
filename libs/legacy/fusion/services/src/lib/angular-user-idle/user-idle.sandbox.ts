import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FusionConfigService } from '@exxat/fusion/core';
import { UserIdleService } from './user-idle.service';

@Injectable({providedIn: 'any'})
export class UserIdleSandbox {
    idle: number;
    timeout: number;
    ping: number;
    lastPing: string;
    isWatching: boolean;
    isTimer: boolean;
    timeIsUp: boolean;
    timerCount: number;

    private timerStartSubscription: Subscription;
    private timeoutSubscription: Subscription;
    private pingSubscription: Subscription;
    private readonly userIdleSettings: any;

    constructor(private readonly  userIdle: UserIdleService, private readonly configService: FusionConfigService) {
        this.userIdleSettings = this.configService.appSettings.userIdleSettings;
    }

    setConfigValues(idle: number, timeout: number, ping: number) {
        this.idle = idle;
        this.timeout = timeout;
        this.ping = ping;

        this.userIdle.setConfigValues({
            idle: this.idle,
            timeout: this.timeout,
            ping: this.ping
        });
    }

    onStartWatching(
        onTimerStartCallback: (value: any) => void,
        onTimeoutCallback: () => void,
        onPingCallback: (count: any) => void = null
    ) {
        if (this.userIdleSettings != null) {
            this.setConfigValues(this.userIdleSettings.idle, this.userIdleSettings.timeout, this.userIdleSettings.ping);

            this.isWatching = true;
            this.timerCount = this.timeout;

            // Start watching for user inactivity.
            this.userIdle.startWatching();

            // Start watching when user idle is starting.
            this.timerStartSubscription = this.userIdle.onTimerStart()
                .pipe(tap(() => this.isTimer = true))
                .subscribe(count => onTimerStartCallback(count));

            // Start watch when time is up.
            this.timeoutSubscription = this.userIdle.onTimeout()
                .subscribe(() => onTimeoutCallback());

            if (onPingCallback)
                this.pingSubscription = this.userIdle.ping$.subscribe(value => onPingCallback(value));
        }
    }
    onStopWatching() {
        this.userIdle.stopWatching();
        this.timerStartSubscription.unsubscribe();
        this.timeoutSubscription.unsubscribe();
        this.pingSubscription.unsubscribe();
        this.isWatching = false;
        this.isTimer = false;
        this.timeIsUp = false;
        this.lastPing = null;
    }
    onStopTimer() {
        this.userIdle.stopTimer();
        this.isTimer = false;
    }
    onResetTimer() {
        this.userIdle.resetTimer();
        this.isTimer = false;
        this.timeIsUp = false;
    }
}

