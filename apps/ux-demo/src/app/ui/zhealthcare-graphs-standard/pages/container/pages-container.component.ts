import { Component, OnInit } from '@angular/core';

export interface pageListItem {
  title: string;
  icon: string;
  description?: string;
  page?: string;
}
@Component({
  selector: 'zhealthcare-graphs-pages-container',
  templateUrl: 'pages-container.component.html',
})
export class PagesContainerComponent implements OnInit {
  page_list: pageListItem[] = [
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Page One',
      description: 'Page One',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages/page_one',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Page Two',
      description: 'Page Two',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages/page_two',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Page Three',
      description: 'Page Three',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages/page_three',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Page Four',
      description: 'Page Four',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages/page_four',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Page Five',
      description: 'Page Five',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages/page_five',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Page Six',
      description: 'Page Six',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages/page_six',
    },
    {
      icon: 'fa-light fa-chart-waterfall',
      title: 'Page Seven',
      description: 'Page Seven',
      page: '/admin/ux/ui/zhealthcare_graphs_standards/pages/page_seven',
    },
  ];

  ngOnInit() {}
}
