import {SurveySection, SurveySectionType} from '../survey-section';
import {QuestionSectionAnswer} from './question-section-answer';

export class QuestionSection implements SurveySection {
  private _id: string;
  private _name: string;
  private _question: string;
  private _answers: QuestionSectionAnswer[];
  private _correctAnswer: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get type(): SurveySectionType {
    return 'question';
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get answers(): QuestionSectionAnswer[] {
    return this._answers;
  }

  set answers(value: QuestionSectionAnswer[]) {
    this._answers = value;
  }

  get correctAnswer(): string {
    return this._correctAnswer;
  }

  set correctAnswer(value: string) {
    this._correctAnswer = value;
  }
}
