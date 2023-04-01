import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { FuseSidebarService } from '@exxat/ux';
import { ExxatTag, ExxatTagOptions, TagEvent } from '@exxat/plugin/tags';
import { HeaderService } from '@exxat/ux';

@Component({
  selector: 'ryzen-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements OnInit {
  selectedLoacation: string;

  public tagOptions = new ExxatTagOptions();

  tags: Array<ExxatTag> = [
    {
      id: Math.random(),
      name: 'Tag Label 1 Bigger Text',
      color: 'indigo-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 2',
      color: 'deep-orange-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 3',
      color: 'pink-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 4 Bigger Text',
      color: 'blue-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 5',
      color: 'gray-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 6',
      color: 'purple-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 7 Bigger Text',
      color: 'yellow-500',
      isChecked: true,
    },
    {
      id: Math.random(),
      name: 'Tag Label 8',
      color: 'green-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 9',
      color: 'pink-500',
      isChecked: false,
    },
    {
      id: Math.random(),
      name: 'Tag Label 10 Bigger Text',
      color: 'indigo-500',
      isChecked: true,
    },
  ];

  @Output() menuOpened: EventEmitter<void>;

  locationList = [
    'Seniour rehab solutions - One',
    'Seniour rehab solutions - Health care - One',
    'Seniour rehab solution - One',
    'Affirma rehab care - One',
    'Seniour rehab solutions - Health care - Five',
    'Seniour rehab solutions - Health care - Two',
    'Seniour rehab solution - Health Rehab - One',
    'Affirma rehab care - Health Rehab',
    'Seniour rehab solutions - Health Rehab - Three',
    'Seniour rehab solutions - Health care - Four',
  ];

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    public headerService: HeaderService
  ) {
    this.selectedLoacation = this.locationList[0];
  }

  ngOnInit() {}

  openTagswithoutButtons() {
    this.tagOptions = {
      saveButton: false,
      tagTitleMaxLength: 50,
      tagsListLength: 7,
    };
  }

  onTagChanges(event: TagEvent) {
    if (event.eventType.toLowerCase() === 'change') {
      this.tags = new Array<ExxatTag>();
      Object.assign(this.tags, event.tags);
    }
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  selectLocation(item: string) {
    this.selectedLoacation = item;
  }
}
