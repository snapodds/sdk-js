import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { WebcamModule } from 'ngx-webcam';
import { FileTranslateLoader } from '../services/i18n/file-translate-loader';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HelpComponent } from './help/help.component';
import { OddsComponent } from './odds/odds.component';
import { SnapComponent } from './snap/snap.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SwitchSvgComponent } from './svgs/switch-svg.component';
import { TriggerSvgComponent } from './svgs/trigger.svg.component';
import { TriggerComponent } from './trigger/trigger.component';
import { WebcamComponent } from './webcam/webcam.component';

@NgModule({
  declarations: [
    AppComponent,
    SnapComponent,
    OddsComponent,
    WebcamComponent,
    SpinnerComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    HelpComponent,
    TriggerComponent,
    TriggerSvgComponent,
    SwitchSvgComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebcamModule,
    PinchZoomModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useClass: FileTranslateLoader,
      },
    }),
  ],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('snapodds-sdk', el);
  }
}
