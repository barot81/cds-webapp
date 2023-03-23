import { OuCodeAccessTree, TenantWithOuCodeTree } from '@exxat/fusion/models';
import { OrgActions, OrgActionTypes } from '../actions/org.actions';


export interface OrgState {
  TenantWithOuCodeTree: TenantWithOuCodeTree;
}
let tenantId = sessionStorage.getItem('TenantId');
let oucodes : OuCodeAccessTree[] = JSON.parse(sessionStorage.getItem('Oucodes'));
if(!tenantId) {
    tenantId = localStorage.getItem('TenantId');
    if(tenantId)
        sessionStorage.setItem('TenantId',tenantId);
}
if(!oucodes) {
    oucodes =  JSON.parse(localStorage.getItem('Oucodes'));
    if(oucodes)
       sessionStorage.setItem('Oucodes',JSON.stringify(oucodes));
}

const initialOucodes = oucodes ? oucodes :  [{
  'Name': 'Base',
  'Oucode': '1000',
  'caption': '',
  'fullName':'',
  'isSelected': false,
  'Children':[]
}];
export const initialMetaState: OrgState = {
  TenantWithOuCodeTree: {
        TenantId: tenantId ? tenantId :'Base',
        OucodeTree: initialOucodes,
        FlatArray: convertOucodesFlatList([],initialOucodes,0,''),
        TenantName: 'Base',
    }
};

export function OrgReducer(state = initialMetaState, action: OrgActions): OrgState {
    switch (action.type) {
        case (OrgActionTypes.SetTenantWithOucodes):
        case (OrgActionTypes.UpdateTenantWithOucodes):
        {
            const tenantWithOucodeTree = {...action.payload};
            tenantWithOucodeTree.FlatArray = convertOucodesFlatList([], action.payload.OucodeTree,0,'');
            state = { ...state, TenantWithOuCodeTree: {...tenantWithOucodeTree,TenantName : state.TenantWithOuCodeTree.TenantName}};
            return state;
        }
        case (OrgActionTypes.SetTenantName):
        {
            return  {...state,TenantWithOuCodeTree:{...state.TenantWithOuCodeTree,
              TenantName:action.payload}};
        }
        case OrgActionTypes.SetOuCodeAccessTree: {
        return {
        ...state,
        TenantWithOuCodeTree: {
          ...state.TenantWithOuCodeTree,
          OucodeTree: [
            {
              ...state.TenantWithOuCodeTree.OucodeTree[0],
              Children: action.payload,
            },
          ],
        },
      };
      }
        case (OrgActionTypes.GetTenantWithOucodes):
        default:
        {
            return {
                ...state
            };
        }
    }
}


function convertOucodesFlatList(oucodeArr, Oucodes, level, parent) {
  if (Array.isArray(Oucodes) && Oucodes.length > 0) {
    level = level + 1;

    Oucodes.forEach((element) => {
      const node = setNodeValue([], element, parent);
      if (
        element.hasOwnProperty('Children') &&
        element['Children'].length > 0
      ) {
        oucodeArr.push(node);
        parent = getParentName(level, element, parent);
        convertOucodesFlatList(
          oucodeArr,
          element.Children,
          level,
          parent
        );
      } else {
        oucodeArr.push(node);
      }
    });
  }
  return oucodeArr;
}

function setOucodeStr(level: any, OucodeStr: any, parent: any) {
  if (level > 2) {
    OucodeStr = (OucodeStr === '' ? '' : `${OucodeStr}.`) + parent.Name;
  }
  return OucodeStr;
}

function getParentName(level, element, parent) {
  if (level > 0) {
    return element;
  }
  return { Name: parent, Oucode: null};
}

function getParentOucode(level, element) {
  if (level > 1) {
    return element.Oucode;
  }
  return null;
}

function setNodeValue(node, element, parent) {
  node['Oucode'] = element.Oucode;
  node['Name'] = element.Name;

  node['fullName'] = element.fullName;
  node['parentOucode'] = parent.Oucode;
  node['isSelected'] = element.isSelected;
  return node;
}

