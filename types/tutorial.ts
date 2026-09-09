export type TutorialStepType =
  | 'welcome'
  | 'levels'
  | 'exercise1'
  | 'exercise2'
  | 'exercise3'
  | 'exercise4'
  | 'stars'
  | 'freedom'
  | 'tips'
  | 'rules';

export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  type: TutorialStepType;
}
