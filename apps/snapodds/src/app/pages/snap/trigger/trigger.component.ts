import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'snapodds-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss'],
})
export class TriggerComponent {
  @Input() disabled = false;
  @Input() processing = false;
  @Output() clicked = new EventEmitter<void>();
}
