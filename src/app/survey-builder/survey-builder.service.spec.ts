import {TestBed} from '@angular/core/testing';

import {SurveyBuilderService} from './survey-builder.service';
import {Survey} from '../shared/models/survey';
import {QuestionSection} from '../shared/models/survey-sections/question-section';

describe('SurveyBuilderService', () => {
  let service: SurveyBuilderService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SurveyBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('newSurvey', () => {
    it('should create survey with default values', done => {
      service.newSurvey().subscribe((survey: Survey) => {
        expect(survey.id).toBeTruthy();
        expect(survey.slug).toBeNull();
        expect(survey.sections).toEqual([]);
        expect(survey.startDate).toBeNull();
        expect(survey.endDate).toBeNull();
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
  });

  describe('addSectionToSurvey', () => {
    it('should add question when passed "question" type', done => {
      service.newSurvey().subscribe(survey => {
        service.addSectionToSurvey(survey.id, 'question').subscribe(modifiedSurvey => {
          expect(modifiedSurvey.sections.length).toEqual(1);
          const section = modifiedSurvey.sections[0] as QuestionSection;
          expect(section.id).toBeTruthy();
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
});
