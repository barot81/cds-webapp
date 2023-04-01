export enum FormStepStatusEnum {
  COMPLETED = 0,
  NEEDATTENTION = 1,
  PENDING = 2
}
export type FormStep = {
  id: string;
  title: string;
  status: FormStepStatusEnum;
  children?: Array<FormStep>;
};
