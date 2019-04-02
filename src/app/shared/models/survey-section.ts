export interface SurveySection {
  id: string;
  name: string;
  type: SurveySectionType;
}

export type SurveySectionType = 'question';
