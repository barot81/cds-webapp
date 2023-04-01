import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


interface OptionItem {
  value: string;
  viewValue: string;
}

interface OptionGroup {
  disabled?: boolean;
  name: string;
  optionItem: OptionItem[];
}


@Component({
  selector: 'ryzen-add-mapping-drawer',
  templateUrl: './add-mapping-drawer.component.html',
})
export class AddMappingDrawerComponent {

  maapingFromGroups: OptionGroup[] = [
    {
      name: 'Entire course',
      optionItem: [
        { value: 'Entire course', viewValue: 'Entire course' }
      ]
    },
    {
      name: 'Course measure',
      optionItem: [
        { value: 'objective', viewValue: 'Objective' },
        { value: 'outcomes', viewValue: 'Outcomes' },
        { value: 'goals', viewValue: 'Goals' },
        { value: 'instructional_objectives', viewValue: 'Instructional Objectives' },
        { value: 'session', viewValue: 'Session' }
      ]
    }
  ];

  mappingToItems = [
    { value: 'capte', viewValue: 'CAPTE' },
    { value: 'blooms', viewValue: 'Blooms' },
    { value: 'arc_pa', viewValue: 'ARC PA' },
    { value: 'npte', viewValue: 'NPTE' },
    { value: 'acote', viewValue: 'ACOTE' },
  ]

  addMappingConnectionForm: FormGroup;

  constructor(private readonly _fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.addMappingConnectionForm = this._fb.group({
      mappingFrom: [],
      mappingTo: [],
      attributes: []
    })
  }

}
