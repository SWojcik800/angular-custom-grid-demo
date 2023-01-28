import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesTableComponent } from './companies-table/companies-table.component';
import { CustomTableModule } from 'src/app/shared';


@NgModule({
  declarations: [
    CompaniesTableComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    CustomTableModule
  ]
})
export class CompaniesModule { }
