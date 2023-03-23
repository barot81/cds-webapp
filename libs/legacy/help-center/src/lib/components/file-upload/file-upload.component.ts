import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  EventEmitter, OnInit,
  Output
} from '@angular/core';
import { EventItem, EventsService } from '@zhealthcare/fusion/core';
import lodash from 'lodash';


export interface PeriodicElement {
  id: any;
  status: string;
  priority: string;
  organization_id: any;
}

@Component({
  selector: 'v4-app-help-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpCenterFileuploadComponent implements OnInit {

  filesList: any = [];
  @Output() filesListEvent = new EventEmitter<string>()

  constructor(
    private _eventsService: EventsService,
    private cd: ChangeDetectorRef
  ) {
    console.log('')
  }

  ngOnInit() {
    console.log('')
    this.clearFilesListener();
  }

  clearFilesListener() {
    this._eventsService.subscribe('clear_files_uploaded', (value: EventItem ) => {
      this.filesList = [];
      this.cd.detectChanges();
    });
  }

  onUploadFiles(files: File[]) {
    lodash.forEach(files, (file: any) => {
      this.filesList.push({
        name: file.name,
        description: file.description,
        data: file,
        fileSize: file.size
      })
    });
    this.filesListEvent.emit(this.filesList)
  }

  deleteFile(item: any, i: any){
    this.filesList.splice(i, 1);
  }

}
