import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-column',
  template: '',
})
export class CustomColumnComponent {
  @Input() fieldName!: string;
  @Input() header?: string;
  @Input() sortable: boolean = false;

}
