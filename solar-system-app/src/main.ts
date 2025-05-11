import { bootstrapApplication } from '@angular/platform-browser';
import { SolarSystemComponent } from './app/solar-system.component';

bootstrapApplication(SolarSystemComponent)
  .catch((err) => console.error(err));
