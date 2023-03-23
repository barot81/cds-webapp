import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { FileConfiguration } from '../../models/file-upload-config';
import { FileSandbox } from '../../services/file.sandbox';
import { AvatarInformation } from '../../models/avatar-information.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Logger } from '@exxat/fusion/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'exxat-avatar',
  templateUrl: './exxat-avatar.component.html',
  styleUrls: ['./exxat-avatar.component.scss'],
})
export class ExxatAvatarComponent implements OnChanges {
  private readonly _unsubscribe: Subject<any>;

  @Input() src: string | ArrayBuffer;
  @Input() size: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() fileConfiguration: FileConfiguration;
  @Input() fileDowloadKey: string;
  @ViewChild('upload', { static: false }) upload: ElementRef;

  firstInitial: string;
  lastInitial: string;
  avatarInformation: AvatarInformation = {
    thumbnailImage: undefined,
    fullname: undefined,
    fileCollectionKey: undefined,
    loading: false,
    initials: false,
  };
  avatarSubject$ = new BehaviorSubject<AvatarInformation>(
    this.avatarInformation
  );
  visible: boolean;
  diameter: number;
  constructor(private fileService: FileSandbox) {
    this._unsubscribe = new Subject();
  }

  ngOnChanges() {
    if (this.fileDowloadKey) {
      this.downloadAvatar();
    } else {
      this.src = '';
    }

    if (this.firstName) {
      this.firstInitial = this.firstName.charAt(0).toUpperCase();
    }

    if (this.lastName) {
      this.lastInitial = this.lastName.charAt(0).toUpperCase();
    }
  }

  public downloadAvatar(type?) {
    this.avatarInformation.loading = true;
    if (type == undefined) {
      switch (this.size) {
        case 'lg':
        case 'large':
          type = 'ThumbnailLarge';
          this.diameter = 60;
          break;
        case 'md':
        case 'medium':
          type = 'ThumbnailMedium';
          this.diameter = 50;
          break;
        case 'sm':
        case 'small':
          type = 'ThumbnailSmall';
          this.diameter = 25;
          break;
        default:
          type = 'Original';
      }

      return this.fileService
        .downloadFile(
          this.fileDowloadKey,
          type,
          this.fileConfiguration.fileEndpoint,
          true
        )
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(
          (responseImage) => {
            if (responseImage && responseImage.body) {
              this.avatarInformation.loading = false;
              let reader = new FileReader();
              reader.onload = (e) => (this.src = e.target.result);

              reader.readAsDataURL(responseImage.body);
            }
            else if (responseImage && responseImage.status === 204) {
              this.avatarInformation.loading = false;
            }
          },
          (error) => {
            this.avatarInformation.loading = false;
            Logger.error(`ExxatAvatar : Error in ExxatAvatar: ${error}`);
          }
        );
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
