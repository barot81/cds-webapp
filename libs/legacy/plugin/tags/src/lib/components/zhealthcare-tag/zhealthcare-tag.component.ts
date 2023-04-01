import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { zhealthcareTagOptions } from '../model';

export interface zhealthcareTag {
  id: any;
  name?: string;
  title?: string;
  color: string;
  colorCode?: string;
  isChecked?: boolean;
}

export class TagEvent {
  tags: any;
  eventType: string;
}

@Component({
  selector: 'zhealthcare-tag',
  templateUrl: './zhealthcare-tag.component.html',
  styleUrls: ['./zhealthcare-tag.component.scss']
})
export class zhealthcareTagComponent implements OnChanges, OnInit {
  tooltipOptions = {
    contentType: 'string',
    placement: 'top',
    theme: 'dark',
    trigger: 'hover',
    'max-width': '128',
    width: '128',
    pointerEvents: 'auto'
  };

  addButtonDisableRule = new BehaviorSubject<boolean>(false);

  $addButtonDisableRule = this.addButtonDisableRule.asObservable();

  addTagForm: FormGroup;

  public _options = new zhealthcareTagOptions();

  editTagForm: FormGroup;

  public class: string = 'views';

  @Input() tags: Array<zhealthcareTag>;

  @Input() options?: zhealthcareTagOptions;

  @Output() onTagChanges: EventEmitter<any> = new EventEmitter<any>();

  tagsMenuView: string;

  selectedTag: zhealthcareTag;

  constructor(private fb: FormBuilder) {
    this.tagsMenuView = 'tags';
  }

  initAddTagForm() {
    this.addTagForm = this.fb.group({
      name: [
        ,
        Validators.compose([
          Validators.required,
          Validators.maxLength(this._options.tagTitleMaxLength)
        ])
      ],
      color: ['blue-400']
    });
  }

  get addFormTagTitle() {
    return this.addTagForm.get('name');
  }

  get editFormTagTitle() {
    return this.editTagForm.get('name');
  }

  initEditTagForm(selectedTag: zhealthcareTag) {
    this.editTagForm = this.fb.group({
      name: [
        selectedTag.name,
        Validators.compose([
          Validators.required,
          Validators.maxLength(this._options.tagTitleMaxLength)
        ])
      ],
      color: [selectedTag.color]
    });
  }

  ngOnInit() {
    this._options = this.options;
    this.initAddTagForm();
    this.addButtonDisableRule.next(
      this._options.tagsListLength != 0 &&
        this.tags.length >= this._options.tagsListLength
    );
    this.tagsMenuView = 'tags';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this._options = JSON.parse(JSON.stringify(changes.options.currentValue));

      this.addButtonDisableRule.next(
        this._options.tagsListLength != 0 &&
          this.tags.length >= this._options.tagsListLength
      );

      if (this._options.saveButton) {
        this.class = 'with-button';
      } else {
        this.class = 'views';
      }
    }
    this.tagsMenuView = 'tags';
    this.initAddTagForm();
  }

  addNewTag(): void {
    const latestTag: zhealthcareTag = {
      id: Math.random(),
      name: this.addTagForm.controls['name'].value,
      color: this.addTagForm.controls['color'].value,
      isChecked: false
    };
    if (latestTag.name.length > 0) {
      this.tags.push(Object.assign({}, latestTag));
      this.onTagAdded(latestTag);
    }
    this.tagsMenuView = 'tags';
    this.addTagForm.reset();
    this.initAddTagForm();
    this.addButtonDisableRule.next(
      this._options.tagsListLength != 0 &&
        this.tags.length >= this._options.tagsListLength
    );
  }

  toggleTags(id: any, event: any) {
    this.selectedTag = this.tags.find((res) => {
      return res.id === id;
    });
    if (this.selectedTag) {
      this.selectedTag.isChecked = event.checked;
      if (!this._options.saveButton) {
        this.onTagsChanged();
      }
    }
  }

  onTagsChanged() {
    const tagEvent: TagEvent = {
      tags: this.tags,
      eventType: 'Change'
    };
    this.onTagChanges.emit(tagEvent);
  }

  onTagEdited() {
    const latestTag: zhealthcareTag = {
      id: this.selectedTag.id,
      name: this.editTagForm.controls['name'].value,
      color: this.editTagForm.controls['color'].value,
      isChecked: this.selectedTag.isChecked
    };
    this.tags.forEach((element) => {
      if (element.id === latestTag.id) {
        element.name = latestTag.name;
        element.color = latestTag.color;
        element.isChecked = latestTag.isChecked;
      }
    });
    const tagEvent: TagEvent = {
      tags: latestTag,
      eventType: 'Edit'
    };
    this.onTagChanges.emit(tagEvent);
    this.tagsMenuView = 'tags';
  }

  onTagAdded(latestTag: zhealthcareTag) {
    const tagEvent: TagEvent = {
      tags: latestTag,
      eventType: 'Add'
    };
    this.onTagChanges.emit(tagEvent);
  }

  onSubmit() {
    this.onTagsChanged();
  }
}
