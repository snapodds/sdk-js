import { Component, Input } from '@angular/core';
import { AppState } from '../../../../states/app-state.store';

@Component({
  selector: 'snapodds-user-feedback-message',
  templateUrl: 'user-feedback-message.component.html',
  styleUrls: ['./user-feedback-message.component.scss'],
})
export class UserFeedbackMessageComponent {
  @Input() appState?: AppState;
}
