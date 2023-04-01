import { Component } from '@angular/core';
import { FuseSidebarService } from '@zhealthcare/ux';
import { ReleaseNotesDemoAppDrawerService } from '../../release-notes-demo-app-drawer.service';

export class ReleaseNoteListItem {
  title: string;
  date: string;
  release: string;
  status: string;
  status_class: string;
}

@Component({
  selector: 'ryzen-release-notes-demo-app-page',
  templateUrl: './release-notes-demo-app-page.component.html',
  styleUrls: ['./release-notes-demo-app-page.component.scss']
})
export class ReleaseNotesDemoAppPageComponent {


  releaseNoteList: Array<ReleaseNoteListItem> = [
    { title: 'New features for STEPS', date: 'Dec 07th, 2020', release: 'R8', status: 'In Progress', status_class: 'pending' },
    { title: 'Version Title 7', date: 'Dec 07th, 2020', release: 'R7', status: 'Published', status_class: 'approved' },
    { title: 'Version Title 6', date: 'Dec 07th, 2020', release: 'R6', status: 'Published', status_class: 'approved' },
    { title: 'Version Title 5', date: 'Dec 07th, 2020', release: 'R5', status: 'Published', status_class: 'approved' },
    { title: 'Version Title 4', date: 'Dec 07th, 2020', release: 'R4', status: 'Published', status_class: 'approved' },
    { title: 'Version Title 3', date: 'Dec 07th, 2020', release: 'R3', status: 'Published', status_class: 'approved' },
    { title: 'Version Title 2', date: 'Dec 07th, 2020', release: 'R2', status: 'Published', status_class: 'approved' },
    { title: 'Version Title 1', date: 'Dec 07th, 2020', release: 'R1', status: 'Published', status_class: 'approved' }
  ];

  notesList = [
    `- Navigate using a newly re-designed left side “hamburger” menu with a “Program” section that
    contains elements that apply, not just to clinical education, but to your program as a whole.This will
    be a huge value add for any of you who use(or choose to add!) PLAN for Curricular Mapping or
    ASSESS for Didactic management.`,
    `- Easily find your students thanks to consistent student representation in the format of “Last
    name, First name” in alphabetical order and accompanied by tags.`,
    `- Expanded accessibility features on the student side for increased ease in usability for those
    who require accommodations.`,
    `- Advanced filtering and search capabilities on many screens.`,
    `- Override the recipient list on any email to send system generated messages directly to a
    particular address.`,
    `- Provide role-based access at the cohort level limiting a team member’s visibility to the
    cohorts with whom they are associated.`,
    `- Accurately enter addresses with the addition of ZIP+4 and territories to address entry.`
  ];

  selectedItem: string;

  constructor(private _fuseSidebarService: FuseSidebarService, public _drawerService: ReleaseNotesDemoAppDrawerService) {
    this.selectedItem = this.releaseNoteList[0].title.trim().toLowerCase();
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  setSelectedItem(title: string) {
    this.selectedItem = title.trim().toLowerCase();
  }
}
