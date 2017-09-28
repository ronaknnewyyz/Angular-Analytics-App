import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartRoutingModule } from './bar-chart-routing.module';
import { GraphDataModule } from '../shared/graph-data.module';

import { DataService } from '../shared/data.service';
import { BarChartComponent } from './bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    BarChartRoutingModule,
    GraphDataModule
  ],
  declarations: [
    BarChartComponent,
  ],
  providers: [DataService]
})
export class BarChartModule { }
