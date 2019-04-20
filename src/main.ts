import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Survey} from './app/shared/models/survey';
import * as uuid from 'uuid';
import {SurveySection} from './app/shared/models/survey-section';

if (environment.production) {
  enableProdMode();
}

// Added example survey if none present
const item = localStorage.getItem('surveys');
if (!item) {
  const survey: Survey = {
    id: uuid(),
    name: 'Example Survey',
    slug: null,
    sections: [
      {
        id: uuid(),
        type: 'question',
        name: 'New Section',
        question: 'Example Question',
        correctAnswer: null,
        answers: [
          {
            id: uuid(),
            text: 'Answer 1',
          },
          {
            id: uuid(),
            text: 'Answer 2',
          }
        ],
      } as SurveySection
    ],
    startDate: null,
    endDate: null,
  };

  localStorage.setItem('surveys', JSON.stringify([survey]));
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
