import {SurveySection} from './survey-section';

export interface Survey {
  id: string;
  name: string;
  slug: string;
  sections: SurveySection[];
  startDate: Date;
  endDate: Date;
}
