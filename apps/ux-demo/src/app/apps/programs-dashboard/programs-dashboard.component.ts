import { Component, OnInit } from '@angular/core';

export interface Program {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'ryzen-programs-dashboard',
  templateUrl: './programs-dashboard.component.html',
  styleUrls: ['./programs-dashboard.component.scss']
})
export class ProgramsDashboardComponent implements OnInit {

  programList: Program[] = [{ icon: '3d_rotation', title: 'PT', description: 'This is PT program.' },
  { icon: 'ac_unit', title: 'PA', description: 'This is PA program. This is PA program.This is PA program.This is PA program.' },
  { icon: 'account_balance', title: 'OT', description: 'This is OT program. This is OT program.This is OT program.This is OT program.' },
  { icon: 'add_shopping_cart', title: 'PTA', description: 'This is PTA program. This is PTA program.This is PTA program.This is PTA program.' },
  { icon: 'contact_mail', title: 'OTA', description: 'This is OTA program. This is OTA program.This is OTA program.This is OTA program.' },
  { icon: 'public', title: 'Nursing', description: 'This is Nursing program. This is Nursing program.This is Nursing program.This is Nursing program.This is Nursing program.' }]

  constructor() { }

  ngOnInit() {
  }

}
