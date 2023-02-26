import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { TranslocoRootModule } from './app/core/transloco-root.module';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(TranslocoRootModule), provideHttpClient()],
});
