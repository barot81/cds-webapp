import { FacilityWiseStatuses, StatusCount } from '@zhealthcare/fusion/models';
import { OrgActions, OrgActionTypes } from '../actions/org.actions';

export interface OrgState {
  FacilityWiseStatuses: FacilityWiseStatuses;
}
let facilityId = sessionStorage.getItem('FacilityId');
let statusCount: StatusCount[] = JSON.parse(sessionStorage.getItem('Statuses'));
if (!facilityId) {
  facilityId = localStorage.getItem('FacilityId');
  if (facilityId) sessionStorage.setItem('FacilityId', facilityId);
}
if (!statusCount) {
  statusCount = JSON.parse(localStorage.getItem('Statuses'));
  if (statusCount)
    sessionStorage.setItem('Statuses', JSON.stringify(statusCount));
}

const initialOucodes = statusCount
  ? statusCount
  : [
      {
        status: 'Total',
        count: '0',
        isSelected: false,
      },
    ];
export const initialMetaState: OrgState = {
  FacilityWiseStatuses: {
    FacilityId: facilityId ? facilityId : 'Base',
    StatusCount: initialOucodes,
  },
};

export function OrgReducer(
  state = initialMetaState,
  action: OrgActions
): OrgState {
  switch (action.type) {
    case OrgActionTypes.SetFacilityWithStatuses:
    case OrgActionTypes.UpdateFacilityWiseStatuses: {
      const facilityStatuses = { ...action.payload };
      state = {
        ...state,
        FacilityWiseStatuses: {
          ...facilityStatuses,
          FacilityId: state.FacilityWiseStatuses.FacilityId,
        },
      };
      return state;
    }
    case OrgActionTypes.SetFacilityName: {
      return {
        ...state,
        FacilityWiseStatuses: {
          ...state.FacilityWiseStatuses,
          FacilityId: action.payload,
        },
      };
    }
    case OrgActionTypes.SetStatusCount: {
      return {
        ...state,
        FacilityWiseStatuses: {
          ...state.FacilityWiseStatuses,
          StatusCount: action.payload,
        },
      };
    }
    case OrgActionTypes.GetFacilityWiseStatuses:
    default: {
      return {
        ...state,
      };
    }
  }
}
