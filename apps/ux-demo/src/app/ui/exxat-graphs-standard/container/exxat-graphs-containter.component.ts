import { Component, OnInit } from '@angular/core';

export interface componentItem {
  title: string;
  icon: string;
  description?: string;
  page?: string;
}

@Component({
  selector: 'exxat-graphs-standard-container',
  templateUrl: 'exxat-graphs-containter.component.html',
  styleUrls: ['./exxat-graphs-containter.component.scss'],
})
export class ExxatGraphsStandardContainerComponent implements OnInit {
  component_item_list: componentItem[] = [
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Pages',
      description: 'Graphs Pages',
      page: '/admin/ux/ui/exxat_graphs_standards/pages',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Layouts',
      description: 'Graphs Layouts',
      page: '/admin/ux/ui/exxat_graphs_standards/layouts',
    },
  ];

  ngOnInit() {}
}
