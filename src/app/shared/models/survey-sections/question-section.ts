import {SurveySection, SurveySectionType} from '../survey-section';
import {QuestionSectionAnswer} from './question-section-answer';

export interface QuestionSection extends SurveySection {
  id: string;
  type: SurveySectionType;
  name: string;
  question: string;
  answers: QuestionSectionAnswer[];
  correctAnswer: string;
}
