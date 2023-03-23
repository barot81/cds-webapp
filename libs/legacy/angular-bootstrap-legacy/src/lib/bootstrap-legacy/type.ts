import { UserPersona } from '@exxat/fusion/models';

export type RoleConfigType = {
  [UserPersona.Administrator]?: [string];
  [UserPersona.FacultyPersona]?: [string];
  [UserPersona.Student]?: [string];
};
