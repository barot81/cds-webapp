import { Component } from '@angular/core';
import { SliderTrack } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-range-slider-example-one',
  templateUrl: './range-slider-example-one.component.html',
  styleUrls: ['./range-slider-example-one.component.scss'],
})
export class RangeSliderExampleOneComponent {
  selectedValue: number = 6;

  sliderTracks: Array<SliderTrack> = [
    {
      endStep: 0,
      bgColor: '#2F80ED',
      description: 'Well Below a Competent Clinician',
    },
    {
      endStep: 6,
      bgColor: '#E85D67',
      description: 'At that level for familiar patients',
    },
    {
      endStep: 8,
      bgColor: '#FFC008',
      description: 'At that level for all patients',
    },
    {
      endStep: 10,
      bgColor: '#009688',
      description: 'Well above the level of a competent clinician',
    },
  ];

  // sliderTracks: Array<SliderTrack> = [
  //   { endStep: 0, bgColor: '#000000', description: 'Well Below a Competent Clinician' },
  //   { endStep: 6, bgColor: '#000000', description: 'At that level for familiar patients' },
  //   { endStep: 8, bgColor: '#000000', description: 'At that level for all patients' },
  //   { endStep: 10, bgColor: '#000000', description: 'Well above the level of a competent clinician' }
  // ]

  onSliderChange($event: any) {
    this.selectedValue = $event;
  }
}
