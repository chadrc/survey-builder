import {SurveySection} from './survey-section';

export class Survey {
  private _id: string;
  private _slug: string;
  private _sections: SurveySection[];
  private _startDate: Date;
  private _endDate: Date;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get slug(): string {
    return this._slug;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get sections(): SurveySection[] {
    return this._sections;
  }

  set sections(value: SurveySection[]) {
    this._sections = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }
}
