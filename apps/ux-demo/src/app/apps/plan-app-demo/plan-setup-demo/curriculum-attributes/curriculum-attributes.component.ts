import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';
import { HeaderService, ExxatTreeNode } from '@exxat/ux';

@Component({
  selector: 'ryzen-curriculum-attributes',
  templateUrl: './curriculum-attributes.component.html',
})
export class CurriculumAttributesComponent implements OnInit, AfterViewInit {

  dataSource: ExxatTreeNode[] = [
    {
      name: 'Themes',
      value: 'Themes',
      children: [
        { name: 'Apple', value: 'Apple', isSelected: true },
        { name: 'Banana', value: 'Banana' },
        { name: 'Fruit loops', value: 'Fruit loops' },
      ]
    }, {
      name: 'Assessment method/Method of evaluation and grading',
      value: 'Assessment method/Method of evaluation and grading',
      children: [
        { name: 'Apple', value: 'Apple', isSelected: true }
      ]
    },
    {
      name: 'Outcome assessment measures',
      value: 'Outcome assessment measures',
      children: [
        { name: 'Apple', value: 'Apple', isSelected: true }
      ]
    },
    {
      name: 'Mapping Level attributes for crosswalk report',
      value: 'Mapping Level attributes for crosswalk report',
      children: [
        { name: 'Apple', value: 'Apple', isSelected: true }
      ]
    },
    {
      name: 'Learning experience/Method of instruction',
      value: 'Learning experience/Method of instruction',
      children: [
        { name: 'Apple', value: 'Apple', isSelected: true }
      ]
    },
    {
      name: 'Competencies',
      value: 'Competencies',
      children: [
        { name: 'Apple', value: 'Apple', isSelected: true }
      ]
    }
  ];



  constructor(public _PlanAppDemoDrawerService: PlanAppDemoDrawerService, public _headerService: HeaderService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setCurrentHeaderHeight(0);
    });
  }

  ngOnInit() {
  }

}
