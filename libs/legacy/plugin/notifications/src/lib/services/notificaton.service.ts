import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { NotificationEmailFormModel } from '../models/notification-emailform.model';
import { NotifationSandbox } from './notification.sandbox';

@Injectable({providedIn: 'any'})
export class NotificationService implements OnDestroy {
  private _unsubscribe: Subject<any>;
  public notificationData = new BehaviorSubject<NotificationEmailFormModel>(
    null
  );
  notificationData$ = this.notificationData.asObservable();

  public templateData = new BehaviorSubject<any>(null);
  templateData$ = this.templateData.asObservable();

  public templateList = new BehaviorSubject<any>(null);
  templateList$ = this.templateList.asObservable();

  public templateParameters = new BehaviorSubject<any>(null);
  templateParameters$ = this.templateParameters.asObservable();

  public emailStepCompletionSatus = new BehaviorSubject<any>(null);
  emailStepCompletionSatus$ = this.emailStepCompletionSatus.asObservable();

  constructor(private _notificationsandbox: NotifationSandbox) {}

  updateData(data: NotificationEmailFormModel) {
    let currentValue;
    this.notificationData$.subscribe(event => (currentValue = event));
    if (currentValue) {
      let updatedValue = Object.assign(currentValue, data);
      this.notificationData.next(updatedValue);
    } else {
      this.notificationData.next(data);
    }
  }

  updateTemplateData(templateData){
    let currentValue;
    this.templateData$.subscribe(event => (currentValue = event));
    if (currentValue != null && currentValue != undefined) {
      let updatedValue = Object.assign(currentValue, templateData);
      this.templateData.next(updatedValue);
    } else {
      this.templateData.next(templateData);
    }
  }

  updateTemplateList(categoryId: string, notificationId: string) {
    this._notificationsandbox
      .TemplateList(categoryId, notificationId)
      .subscribe(response => {
        response = response.filter(x => x != "Inline" );
        this.templateList.next(response);
      });
  }

  updateTemplateParameters(parameters: any){
    if(parameters)
      this.templateParameters.next(parameters);
  }

  updateEmailStatus(status: boolean) {
    this.emailStepCompletionSatus.next(status);
  }

  templateIdValidator(templateIdList: Array<{}>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control?.value && templateIdList.includes(control?.value?.trim())) {
          return { 'templateIdExists': true };
      }
      if (control?.value.includes('/')) {
          return { 'specialCharacterExists': true };
      }
      return null;
    };
  }

  replaceParameters(responseBody, parameters)
  {
    let emailtemplate = responseBody;
    if (parameters) {
      for (let parameter of parameters) {
        emailtemplate = emailtemplate
          .split(parameter.name)
          .join(parameter.displayName);
      }
    }
    return emailtemplate;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
