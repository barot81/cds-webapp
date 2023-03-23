import { UserPersona } from '@zhealthcare/fusion/models';

export type RoleConfigType = {
  [UserPersona.Administrator]?: [string];
  [UserPersona.FacultyPersona]?: [string];
  [UserPersona.Student]?: [string];
};
