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
import { statusReducer } from './store/reducers/statuses.reducers';
import { boardReducer } from './store/reducers/board.reducers';
import { BoardEffects } from './store/effects/board.effects';
import { StatusEffects } from './store/effects/status.effects';
import { PriorityEffects } from './store/effects/priority.effects';
import { priorityReducer } from './store/reducers/priority.reducers';
import { ActivityEffects } from './store/effects/activity.effects';
import { activityReducer } from './store/reducers/activity.reducers';
import { AnalyticsEffects } from './store/effects/analytics.effects';
import { analyticsReducer } from './store/reducers/analytics.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideStore(),
    provideState({ name: 'boards', reducer: boardReducer },),
    provideState({ name: 'statuses', reducer: statusReducer },),
    provideState({ name: 'cards', reducer: cardReducer }),
    provideState({ name: 'priorities', reducer: priorityReducer }),
    provideState({ name: 'activities', reducer: activityReducer }),
    provideState({ name: 'analytics', reducer: analyticsReducer }),
    provideEffects([BoardEffects, CardEffects, StatusEffects, 
      PriorityEffects, ActivityEffects, AnalyticsEffects]),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
    })
  ]
};
