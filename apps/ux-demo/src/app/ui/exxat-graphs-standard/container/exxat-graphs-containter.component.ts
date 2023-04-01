import { Component, OnInit } from '@angular/core';

export interface componentItem {
  title: string;
  icon: string;
  description?: string;
  page?: string;
}

@Component({
  selector: 'zhealthcare-graphs-standard-container',
  templateUrl: 'zhealthcare-graphs-containter.component.html',
  styleUrls: ['./zhealthcare-graphs-containter.component.scss'],
})
export class zhealthcareGraphsStandardContainerComponent implements OnInit {
  component_item_list: componentItem[] = [
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Pages',
      description: 'Graphs Pages',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Layouts',
      description: 'Graphs Layouts',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/layouts',
    },
  ];

  ngOnInit() {}
}
