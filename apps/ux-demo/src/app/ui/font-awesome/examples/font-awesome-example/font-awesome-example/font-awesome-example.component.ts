import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-font-awesome-example',
  templateUrl: './font-awesome-example.component.html',
  styleUrls: ['./font-awesome-example.component.scss']
})
export class FontAwesomeExampleComponent implements OnInit {

  programList = [{ icon: 'fab fa-accusoft', title: 'PT', description: 'This is PT program.' },
  { icon: 'fas fa-analytics', title: 'PA', description: 'This is PA program. This is PA program.This is PA program.This is PA program.' },
  { icon: 'fad fa-album-collection', title: 'OT', description: 'This is OT program. This is OT program.This is OT program.This is OT program.' },
  { icon: 'fas fa-analytics', title: 'PTA', description: 'This is PTA program. This is PTA program.This is PTA program.This is PTA program.' },
  { icon: 'fab fa-accusoft', title: 'OTA', description: 'This is OTA program. This is OTA program.This is OTA program.This is OTA program.' },
  { icon: 'fad fa-album-collection', title: 'Nursing', description: 'This is Nursing program. This is Nursing program.This is Nursing program.This is Nursing program.This is Nursing program.' }]


  constructor() { }

  ngOnInit() {
  }

}