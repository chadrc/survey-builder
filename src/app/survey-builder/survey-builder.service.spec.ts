import {TestBed} from '@angular/core/testing';

import {SurveyBuilderService} from './survey-builder.service';
import {Survey} from '../shared/models/survey';
import {QuestionSection} from '../shared/models/survey-sections/question-section';

describe('SurveyBuilderService', () => {
  let service: SurveyBuilderService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SurveyBuilderService);

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('newSurvey', () => {
    it('should create survey with default values', done => {
      service.newSurvey().subscribe((survey: Survey) => {
        expect(survey.id).toBeTruthy();
        expect(survey.name).toEqual('New Survey');
        expect(survey.slug).toBeNull();
        expect(survey.sections).toEqual([]);
        expect(survey.startDate).toBeNull();
        expect(survey.endDate).toBeNull();
        done();
      });
    });

    it('should save to local storage', done => {
      service.newSurvey().subscribe((survey: Survey) => {
        const storedSurveys: any[] = JSON.parse(localStorage.getItem('surveys'));
        expect(storedSurveys.length).toEqual(1);
        expect(storedSurveys[0].id).toEqual(survey.id);
        done();
      });
    });
  });

  describe('getSurveys', () => {
    it('should return two surveys after creating two surveys', done => {
      service.newSurvey().subscribe(() => {
        service.newSurvey().subscribe(() => {
          service.getSurveys().subscribe((surveys: Survey[]) => {
            expect(surveys.length).toEqual(2);
            done();
          });
        });
      });
    });

    it('should should contain surveys from local storage', done => {
      const survey1 = {
        id: 'one'
      };
      const survey2 = {
        id: 'two'
      };
      localStorage.setItem('surveys', JSON.stringify([
        survey1,
        survey2
      ]));

      service = new SurveyBuilderService();

      service.getSurveys().subscribe((surveys: Survey[]) => {
        expect(surveys.length).toEqual(2);
        expect(surveys[0].id).toEqual('one');
        expect(surveys[1].id).toEqual('two');
        done();
      });
    });
  });

  describe('addSectionToSurvey', () => {
    it('should add question when passed "question" type', done => {
      service.newSurvey().subscribe(survey => {
        service.addSectionToSurvey(survey.id, 'question').subscribe(modifiedSurvey => {
          expect(modifiedSurvey.sections.length).toEqual(1);
          const section = modifiedSurvey.sections[0] as QuestionSection;
          expect(section.id).toBeTruthy();
          expect(section.name).toEqual('New Section');
          expect(section.type).toEqual('question');
          expect(section.question).toBeNull();
          expect(section.answers).toEqual([]);
          expect(section.correctAnswer).toBeNull();

          done();
        });
      });
    });
  });

  describe('addAnswerToQuestionSection', () => {
    it('should add answer to question section', done => {

      service.newSurvey().subscribe(survey => {
        service.addSectionToSurvey(survey.id, 'question').subscribe(modifiedSurvey => {
          const questionSection = modifiedSurvey.sections[0] as QuestionSection;

          service.addAnswerToQuestionSection(survey.id, questionSection.id).subscribe(modifiedSurvey2 => {
            const modifiedQuestionSection = modifiedSurvey2.sections[0] as QuestionSection;
            expect(modifiedQuestionSection.answers.length).toEqual(1);

            const answer = modifiedQuestionSection.answers[0];

            expect(answer.id).toBeTruthy();
            expect(answer.text).toBeNull();

            done();
          });
        });
      });
    });
  });

  describe('editSurvey', () => {
    it('should modify "slug" field', done => {
      service.newSurvey().subscribe(survey => {
        service.editSurvey(survey.id, 'slug', 'my-survey').subscribe(modifiedSurvey => {
          expect(modifiedSurvey.slug).toEqual('my-survey');
          done();
        });
      });
    });
  });

  describe('editQuestionSection', () => {
    it('should modify "question" field', done => {
      service.newSurvey().subscribe(survey => {
        service.addSectionToSurvey(survey.id, 'question').subscribe(modifiedSurvey => {
          const questionSection = modifiedSurvey.sections[0] as QuestionSection;

          service.editQuestionSection(
            survey.id,
            questionSection.id,
            'question',
            'What\'s your favorite color?',
          ).subscribe(modifiedSurvey2 => {
            const modifiedQuestionSection = modifiedSurvey2.sections[0] as QuestionSection;
            expect(modifiedQuestionSection.question).toEqual('What\'s your favorite color?');
            done();
          });
        });
      });
    });
  });

  describe('editQuestSectionAnswer', () => {
    it('should modify "text" field', done => {
      service.newSurvey().subscribe(survey => {
        service.addSectionToSurvey(survey.id, 'question').subscribe(modifiedSurvey => {
          const questionSection = modifiedSurvey.sections[0] as QuestionSection;
          service.addAnswerToQuestionSection(survey.id, questionSection.id).subscribe(modifiedSurvey2 => {
            const modifiedQuestionSection = modifiedSurvey2.sections[0] as QuestionSection;
            const answer = modifiedQuestionSection.answers[0];

            service.editQuestionSectionAnswer(
              survey.id,
              questionSection.id,
              answer.id,
              'text',
              'Blue',
            ).subscribe(modifiedSurvey3 => {
              const modifiedQuestionSection2 = modifiedSurvey3.sections[0] as QuestionSection;
              const modifiedAnswer = modifiedQuestionSection2.answers[0];
              expect(modifiedAnswer.text).toEqual('Blue');
              done();
            });
          });
        });
      });
    });
  });

  describe('deleteSurvey', () => {
    it('should delete survey, getting surveys again will have 0 surveys', done => {
        service.newSurvey().subscribe(survey => {
          service.deleteSurvey(survey.id).subscribe(() => {
            service.getSurveys().subscribe((surveys: Survey[]) => {
              expect(surveys.length).toEqual(0);
              done();
            });
          });
        });
    });
  });

  describe('deleteSurveySection', () => {
    it('should remove section from given survey', done => {
      service.newSurvey().subscribe(survey => {
        service.addSectionToSurvey(survey.id, 'question').subscribe(modifiedSurvey => {
          const questionSection = modifiedSurvey.sections[0];
          service.deleteSurveySection(survey.id, questionSection.id).subscribe(modifiedSurvey2 => {
            expect(modifiedSurvey2.sections.length).toEqual(0);
            done();
          });
        });
      });
    });
  });

  describe('deleteQuestionSectionAnswer', () => {
    it('should remove answer from question section', done => {
      service.newSurvey().subscribe(survey => {
        service.addSectionToSurvey(survey.id, 'question').subscribe(modifiedSurvey => {
          const questionSection = modifiedSurvey.sections[0];

          service.addAnswerToQuestionSection(survey.id, questionSection.id).subscribe(modifiedSurvey3 => {
            const modifiedQuestionSection = modifiedSurvey3.sections[0] as QuestionSection;
            const answer = modifiedQuestionSection.answers[0];

            service.deleteQuestionSectionAnswer(survey.id, modifiedQuestionSection.id, answer.id).subscribe(modifiedSurvey4 => {
              const modifiedQuestSection2 = modifiedSurvey4.sections[0] as QuestionSection;
              expect(modifiedQuestSection2.answers.length).toEqual(0);
              done();
            });
          });
        });
      });
    });
  });
});
