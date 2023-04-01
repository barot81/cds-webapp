import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { GroupedHorizontalBarcChartExampleComponent, GroupedVerticalBarcChartExampleComponent, HorizontalBarcChartExampleComponent, LineChartComponent, NormalizedHorizontalBarComponent, NormalizedVerticalBarComponent, PieChartComponent, StackedHorizontalBarComponent, StackedVerticalBarComponent, VerticalBarcChartExampleComponent, VerticalBarWithCustomLagendChartComponent } from './examples';

const routes: Routes = [
    {
        path: 'ngx-chart-demo',
        component: ContainerComponent,
        children: [
            {
                path: '',
                redirectTo: 'vertical-bar-chart',
                pathMatch: 'full'
            },
            {
                path: 'vertical-bar-chart',
                component: VerticalBarcChartExampleComponent
            },
            {
                path: 'vertical-bar-with-custom-lagend-chart',
                component: VerticalBarWithCustomLagendChartComponent
            },
            {
                path: 'horizontal-bar-chart',
                component: HorizontalBarcChartExampleComponent
            },
            {
                path: 'grouped-vertical-bar-chart',
                component: GroupedVerticalBarcChartExampleComponent
            },
            {
                path: 'grouped-horizontal-bar-chart',
                component: GroupedHorizontalBarcChartExampleComponent
            },
            {
                path: 'stacked-vertical-bar-chart',
                component: StackedVerticalBarComponent
            },
            {
                path: 'stacked-horizontal-bar-chart',
                component: StackedHorizontalBarComponent
            },
            {
                path: 'normalized-vertical-bar-chart',
                component: NormalizedVerticalBarComponent
            },
            {
                path: 'normalized-horizontal-bar-chart',
                component: NormalizedHorizontalBarComponent
            },
            {
                path: 'line-chart',
                component: LineChartComponent
            },
            {
                path: 'pie-chart',
                component: PieChartComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NgxChartDemoRoutingModule { }
