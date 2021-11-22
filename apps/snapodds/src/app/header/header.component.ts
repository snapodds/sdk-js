import { Component } from '@angular/core';
import { ApplicationConfigService } from '../../services/config/application-config.service';

@Component({
  selector: 'snapodds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly applicationConfigService: ApplicationConfigService) {}

  cancelSnap(): void {
    this.applicationConfigService.emitCloseEvent();
  }
}
