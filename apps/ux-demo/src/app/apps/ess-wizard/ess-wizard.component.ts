
import { ThemePalette } from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FileConfiguration, FileEndpoint, FileCard } from '@zhealthcare/plugin/file-upload';
import { SecurityContext } from '@zhealthcare/fusion/models';
import { HeaderService } from '@zhealthcare/ux';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'ryzen-ess-wizard',
  templateUrl: './ess-wizard.component.html',
  styleUrls: ['./ess-wizard.component.scss']
})
export class EssWizardComponent {
  fileConfiguration: FileConfiguration;
  fileDescriptions: FormControl;
  uxDemoAPPSecurityContext: SecurityContext;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes:  number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  emails: string[] = ['demo@example1.com'];
  allEmails: string[] = ['demo@example1.com', 'demo@example2.com', 'demo@example3.com'];

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(public headerService: HeaderService) {

    // File Upload Configuration  -- START
    this.fileConfiguration = new FileConfiguration();
    this.fileConfiguration.fileEndpoint = new FileEndpoint('zhealthcare.ux', 'Demo');
    this.fileConfiguration.fileCards = [];
    const fileCard = new FileCard();
    this.fileConfiguration.fileCards.push(fileCard);
    this.fileConfiguration.securityContext = this.uxDemoAPPSecurityContext;
    fileCard.filePath = 'UX Demo';
    // File Upload Configuration  -- END

    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => email ? this._filter(email) : this.allEmails.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our email
    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEmails.filter(email => email.toLowerCase().indexOf(filterValue) != -1);
  }

  genderList = [
    { value: "template1", viewValue: "Template1" },
    { value: "template2", viewValue: "Template2" },
    { value: "template3", viewValue: "Template3" }
  ];

  //////////////////////////////////////////////////

  task: Task = {
    name: 'Recipients',
    completed: false,
    color: 'accent',
    subtasks: [
      { name: 'Strong Anna', completed: false, color: 'accent' },
      { name: 'Strong Anna', completed: false, color: 'accent' },
      { name: 'Strong Anna', completed: false, color: 'accent' },
      { name: 'Strong Anna', completed: false, color: 'accent' },
      { name: 'Strong Anna', completed: false, color: 'accent' },
      { name: 'Strong Anna', completed: false, color: 'accent' },
      { name: 'Strong Anna', completed: false, color: 'accent' },
      { name: 'Strong Anna', completed: false, color: 'accent' }
    ]
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }
}




















