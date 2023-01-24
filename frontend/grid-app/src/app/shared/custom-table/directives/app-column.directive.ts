import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'app-column-defs>app-column',
})
export class AppColumnDirective {
  @Input()
  fieldName!: string;
  @Input() header?: string;
  @Input() sortable: boolean = false;
  @Input() template?: TemplateRef<any>;
  constructor() { }

}
