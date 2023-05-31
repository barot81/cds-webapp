import { FacilityWiseStatuses, StatusCount } from '@zhealthcare/fusion/models';
import { MetaConstants } from '../../helper/constants';
import { OrgActions, OrgActionTypes } from '../actions/org.actions';

export interface OrgState {
  FacilityWiseStatuses: FacilityWiseStatuses;
}
let facilityId = sessionStorage.getItem(MetaConstants.SelectedFacilityName);
let statusCount: StatusCount[] = JSON.parse(sessionStorage.getItem('Statuses'));
if (!facilityId) {
  facilityId = localStorage.getItem(MetaConstants.SelectedFacilityName);
  if (facilityId) sessionStorage.setItem(MetaConstants.SelectedFacilityName, facilityId);
}
if (!statusCount) {
  statusCount = JSON.parse(localStorage.getItem('Statuses'));
  if (statusCount)
    sessionStorage.setItem('Statuses', JSON.stringify(statusCount));
}

const initialStatuses = statusCount
  ? statusCount
  : [
      {
        name: 'Total',
        count: 0,
        isSelected: false,
      },
    ];
export const initialMetaState: OrgState = {
  FacilityWiseStatuses: {
    FacilityId: facilityId ? facilityId : 'Base',
    StatusCount: initialStatuses,
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
