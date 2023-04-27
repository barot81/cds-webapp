import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StudentTag } from '@exxat/profile/models';
import * as StudentTagActions from '../../actions/tag/student-tag.actions';

export interface StudentTagState extends EntityState<StudentTag> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const studentTagAdapter: EntityAdapter<StudentTag> = createEntityAdapter<StudentTag>();

export const StudentTagInitialState: StudentTagState = studentTagAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const studentTagReducer = createReducer(
  StudentTagInitialState,
  on(StudentTagActions.LoadStudentTag, (state: StudentTagState) => {
    return { ...state, loading: true };
  }),
  on(StudentTagActions.StudentTagLoaded, (state: StudentTagState, { payload }) => {
    state = { ...state, loading: false };
    if (payload) {
    return studentTagAdapter.addMany(payload, state)
    }
    else{
      return state
    }
  }),
  on(StudentTagActions.StudentTagLoadError, (state: StudentTagState, { payload }) => {
    return { ...state, loading: true };
  }),
  on(StudentTagActions.UpdateStudentTag, (state: StudentTagState) => {
    return { ...state, saving: true };
  }),
  on(StudentTagActions.UpdateStudentTagSuccess, (state: StudentTagState, { payload }) => {
    state = { ...state, saving: false };
    return studentTagAdapter.updateOne(payload, state)
  }),
  on(StudentTagActions.UpdateRangeStudentTag, (state: StudentTagState, { payload }) => {
    return { ...state, saving: true };
  }),
  on(StudentTagActions.UpdateRangeStudentTagSuccess, (state: StudentTagState, { payload }) => {
    state = { ...state, saving: false };
    const entitiesValue = Object.keys(state.entities).map(id => state.entities[id]).filter(x => x.studentId === payload[0].studentId)
    entitiesValue.forEach(x => {
      state = studentTagAdapter.removeOne(x.id, state);
    })
    return studentTagAdapter.addMany(payload, state)
  }),
  on(StudentTagActions.AddStudentTag, (state: StudentTagState) => {
    return { ...state, saving: true };
  }),
  on(StudentTagActions.AddStudentTagSuccess, (state: StudentTagState, { payload }) => {
    state = { ...state, saving: false };
    return studentTagAdapter.addOne(payload, state)
  }),
  on(StudentTagActions.DeleteStudentTag, (state: StudentTagState) => {
    return { ...state, saving: true };
  }),
  on(StudentTagActions.DeleteStudentTagSuccess, (state: StudentTagState, { payload }) => {
    state = { ...state, saving: false };
    return studentTagAdapter.removeOne(payload, state)
  }),
  on(StudentTagActions.DeleteRangeStudentTag, (state: StudentTagState) => {
    return { ...state, saving: true };
  }),
  on(StudentTagActions.DeleteRangeStudentTagSuccess, (state: StudentTagState, { payload }) => {
    state = { ...state, saving: false };
    return studentTagAdapter.removeMany(x => x.studentId === payload, state)
  }),
);

export function StudentTagReducer(state: StudentTagState | undefined, action: Action) {
  return studentTagReducer(state, action);
}
