import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CardEffects } from './store/effects/card.effects';
import { provideState, provideStore} from '@ngrx/store';
import { cardReducer } from './store/reducers/card.reducers';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideStore(),
    provideState({ name: 'cards', reducer: cardReducer }),
    provideEffects([CardEffects]),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
    })
  ]
};
