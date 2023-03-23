import {
  AccessedOuCode, OuCodeAccessTree, TokenModel
} from '@exxat/fusion/models';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { OrgReducer, OrgState } from '../reducers/org.reducers';
import { UserReducer, UserState } from '../reducers/user.reducers';
import { getFusionAppState } from './app.selectors';
export interface AppState {
  app: UserState;
  org: OrgState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: UserReducer,
  org: OrgReducer,
};

export const getUserState = createSelector(
  getFusionAppState,
  (state: AppState) => state.app
);

export const getOrgState = createSelector(
  getFusionAppState,
  (state: AppState) => state.org
);

export const getAuthState = createSelector(getUserState, (state: UserState) =>
  state.user !== null ? state.user.Token : new TokenModel()
);

export const isUserLoaded = createSelector(
  getUserState,
  (state: UserState) => state.isLoaded
);

export const getTokenExpiration = createSelector(
  getUserState,
  (state: UserState) => {
    return state.tokenSessionInfo;
  }
);

export const getUserAccessedOuCodes = createSelector(
  getOrgState,
  (state: OrgState) => {
    return getOucodeList([], state.TenantWithOuCodeTree.OucodeTree, '', 0, '');
  }
);

export const getSelectedTenant = createSelector(
  getOrgState,
  (state: OrgState) => {
    return state.TenantWithOuCodeTree.TenantId;
  }
);

export const getSelectedTenantName = createSelector(
  getOrgState,
  (state: OrgState) => {
    return state.TenantWithOuCodeTree.TenantName;
  }
)

export const getLeafOucodeList = createSelector(
  getOrgState,
  (state: OrgState)=>{
    const RootOuCodeTree = state.TenantWithOuCodeTree.OucodeTree[0];
    if( RootOuCodeTree.Children.length === 0) {
      return [RootOuCodeTree];
    }
    return RootOuCodeTree.Children.map((x:OuCodeAccessTree)=>{
      while(x.Children.length > 0){
        x = x.Children[0];
      }
      return x;
    });
  }
)


export const selectedOucode = createSelector(getOrgState, getLeafOucodeList ,
  (state: OrgState, flatArray: OuCodeAccessTree[]) => {
  return flatArray.find((x) => x.isSelected);
});

export function getSelectedOucode(
  oucodeTree: OuCodeAccessTree[] | OuCodeAccessTree
): OuCodeAccessTree {
  if (Array.isArray(oucodeTree)) {
    return selectedOucodeGet(oucodeTree);
  } else {
    if (oucodeTree.isSelected) return oucodeTree;
    else if (oucodeTree.hasOwnProperty('Children'))
      return getSelectedOucode(oucodeTree.Children);
  }
  return null;
}

export function selectedOucodeGet(oucodeTree) {
  let selectedOuCode;

  for (let i = 0; i < oucodeTree.length; i++) {
    const element = oucodeTree[i];
    if (element.isSelected) {
      selectedOuCode = element;
      return selectedOuCode;
    } else if (
      element.hasOwnProperty('Children') &&
      element.Children.length > 0
    ) {
      selectedOuCode = getSelectedOucode(element.Children);
      if (selectedOuCode !== undefined && selectedOuCode !== null) {
        return selectedOuCode;
      }
    }
  }

  return null;
}

export function getOucodeList(
  accessedOuCodes: AccessedOuCode[],
  OucodeAccessTrees: OuCodeAccessTree[],
  OucodeStr: string,
  level: number,
  parent: string
) {
  if (Array.isArray(OucodeAccessTrees)) {
    level = level + 1;
    if (level > 1) {
      OucodeStr = (OucodeStr === '' ? '' : `${OucodeStr}-`) + parent;
    }
    OucodeAccessTrees.forEach((element) => {
      const oucodeWithName: AccessedOuCode = new AccessedOuCode();
      oucodeWithName.Oucode = element.Oucode;
      oucodeWithName.Name = element.Name;
      oucodeWithName.fullName = getFullName(level, OucodeStr, element);

      if (
        element.hasOwnProperty('Children') &&
        element['Children'].length > 0
      ) {
        parent = getParentName(level, element, parent);
        getOucodeList(
          accessedOuCodes,
          element.Children,
          OucodeStr,
          level,
          parent
        );
      } else {
        accessedOuCodes.push(oucodeWithName);
      }
    });
  }

  return accessedOuCodes;
}

function getFullName(level, OucodeStr, element): string {
  return level > 2
    ? (OucodeStr === '' ? '' : `${OucodeStr}-`) + element.Name
    : element.Name;
}
function getParentName(level, element, parent) {
  if (level > 1) {
    return element.Name;
  }
  return parent;
}
