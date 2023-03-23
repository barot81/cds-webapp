import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sandbox } from '@exxat/fusion/core';
import { ReleaseNotesApiClient } from './release-notes.ApiClient';

@Injectable({ providedIn: 'root' })
export class ReleaseNotesSandbox extends Sandbox {
  constructor(private readonly releaseNotesApiClient: ReleaseNotesApiClient) {
    super();
  }

  public GetReleaseNotesNameList(): Observable<any> {
    return this.releaseNotesApiClient.GetReleaseNotesNameList();
  }
}
