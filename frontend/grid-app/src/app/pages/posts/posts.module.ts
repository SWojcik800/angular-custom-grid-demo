import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CustomTableModule } from 'src/app/shared';


@NgModule({
  declarations: [
    PostsTableComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    CustomTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class PostsModule { }
