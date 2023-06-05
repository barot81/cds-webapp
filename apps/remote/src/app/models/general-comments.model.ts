export class GeneralComment {
  comments: string;
  addedBy: string;
  addedOn: string;
}

export class PatientComment {
  generalComment: GeneralComment;
  reviewStatus: string;
  id: string;
}
