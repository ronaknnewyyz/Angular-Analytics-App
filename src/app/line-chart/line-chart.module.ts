import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartRoutingModule } from './line-chart-routing.module';
import { GraphDataModule } from '../shared/graph-data.module';

import { DataService } from '../shared/data.service';
import { LineChartComponent } from './line-chart.component';

@NgModule({
  imports: [
    CommonModule,
    LineChartRoutingModule,
    GraphDataModule
  ],
  declarations: [
    LineChartComponent,
  ],
  providers: [DataService]
})
export class LineChartModule { }
