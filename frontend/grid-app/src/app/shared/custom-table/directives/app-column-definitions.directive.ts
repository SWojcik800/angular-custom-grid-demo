import { ContentChildren, Directive, QueryList } from '@angular/core';
import { AppColumnDirective } from './app-column.directive';

@Directive({
  selector: 'app-column-defs'
})
export class ColumnDefinitionsDirective {
  @ContentChildren(AppColumnDirective)
  columns!: QueryList<AppColumnDirective>;
    constructor() { }

}
