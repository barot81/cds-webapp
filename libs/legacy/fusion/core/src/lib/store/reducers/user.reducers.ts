
import { User, TokenSessionInfo } from '@exxat/fusion/models';
import { UserActionTypes, UserActions } from '../actions/user.actions';
import { EventsService, EventItem } from '../../event';
import { FoundationInjector } from '../../injector/foundation-injector';
import { AppStateHelper } from '../../helper/app-state/app-state.helper';
export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  tokenSessionInfo: TokenSessionInfo;
  error: string | null;
  isLoaded: boolean;
}
const isDelegatorUser = sessionStorage.getItem('IsDelegateUser') === 'true' ? true : false;
const userSt = AppStateHelper.getStateFromStorage('User', isDelegatorUser, true);
const authSt = AppStateHelper.getStateFromStorage('Auth', isDelegatorUser, false);
const tokenSessionInfoSt = AppStateHelper.getStateFromStorage('tokenSessionInfo', false, false);

export const initialUserState: UserState = {
  isAuthenticated: false,
  user: new User(),
  tokenSessionInfo: new TokenSessionInfo(0, 0),
  error: null,
  isLoaded: false
};

if (userSt) {
  userSt.Token = authSt;
  initialUserState.user = userSt;
  initialUserState.isAuthenticated = true;
  initialUserState.tokenSessionInfo = tokenSessionInfoSt ? tokenSessionInfoSt : initialUserState.tokenSessionInfo;
}

export function UserReducer(state = initialUserState, action: UserActions): UserState {
  switch (action.type) {

    case UserActionTypes.LogIn:
    case UserActionTypes.LoginWithRefreshToken:
      return {
        ...state,
        isLoaded: false
      };
    case UserActionTypes.LogInSuccess: {
      const eventService: EventsService = FoundationInjector.get(EventsService);
      const eventItem: EventItem = { payload: false };
      eventService.publish('LOGOUT', eventItem);
      let newUser: User = action.payload.user;
      newUser = {
        ...newUser,
        Token: action.payload.auth
      }
      return {
        ...state,
        isAuthenticated: true,
        user: newUser,
        tokenSessionInfo: { ...action.payload.tokenSessionInfo },
        error: null,
        isLoaded: true
      };
    }

    case UserActionTypes.LoginWithRefreshTokenSuccess: {
      let newUser: User = action.payload.user;
      newUser = {
        ...state.user,
        Token: action.payload.auth
      }
      return {
        ...state,
        isAuthenticated: true,
        user: newUser,
        tokenSessionInfo: { ...action.payload.tokenSessionInfo },
        error: null,
        isLoaded: true
      };
    }
    case UserActionTypes.DelegateLogInSuccess: {
      const eventService: EventsService = FoundationInjector.get(EventsService);
      const eventItem: EventItem = { payload: false };
      eventService.publish('LOGOUT', eventItem);
      let newUser: User = action.payload.user;
      newUser = {
        ...newUser,
        Token: action.payload.auth
      }
      return {
        ...state,
        isAuthenticated: true,
        user: newUser,
        tokenSessionInfo: { ...action.payload.tokenSessionInfo },
        error: null,
        isLoaded: true
      };
    }
    case UserActionTypes.LogInFailure: {
      return {
        ...state,
        error: action.payload?.error || "login failure!!",
      };
    }

    case UserActionTypes.SignUpSuccess: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          Email: action.payload.Email,
          Token: action.payload.auth
        },
        error: null
      };
    }

    case UserActionTypes.SignUpFailure: {
      return {
        ...state,
        error: 'Signup error'
      };
    }

    case UserActionTypes.Logout:
    case UserActionTypes.AzureLogout: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    }
    case UserActionTypes.LoadUser: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null
      };
    }

    case UserActionTypes.UpdateUserSuccess: {
      let newUser = new User();
      newUser = { ...newUser, ...action.payload };
      newUser.Token = state.user.Token;
      newUser.UserRoles = state.user.UserRoles;
      return {
        ...state,
        isAuthenticated: true,
        user: newUser,
        error: null,
        isLoaded: true
      };
    }

    case UserActionTypes.SetTokenSessionInfo: {
      let tokenSessionInfo = new TokenSessionInfo(0, 0);
      if (action.payload === undefined || action.payload === null) {
        tokenSessionInfo = AppStateHelper.generateTokenSessionInfo({ ...state.user })
      } else {
        tokenSessionInfo = action.payload;
      }
      localStorage.setItem('tokenSessionInfo', JSON.stringify(tokenSessionInfo));
      return {
        ...state,
        tokenSessionInfo: {
          ...tokenSessionInfo,
          isAutoRenewCall: false
        }
      }
    }

    case UserActionTypes.UpdateAuthTokenOnStorageChange: {
      return {
        ...state,
        user: {
          ...state.user,
          Token: JSON.parse(action.payload)
        }
      }
    }

    case UserActionTypes.UpdateUserLastActivityTime: {
      let updatedTokenSessionInfo = new TokenSessionInfo(0, 0);
      if (!state.tokenSessionInfo || !state.tokenSessionInfo.tokenExpTime || state.tokenSessionInfo.tokenExpTime === 0) {
        updatedTokenSessionInfo = AppStateHelper.generateTokenSessionInfo({ ...state.user });
      } else {
        updatedTokenSessionInfo = {
          ...state.tokenSessionInfo,
          lastActivityTime: new Date().getTime(),
          isAutoRenewCall: false
        };
      }
      localStorage.setItem('tokenSessionInfo', JSON.stringify(updatedTokenSessionInfo));
      return {
        ...state,
        tokenSessionInfo: updatedTokenSessionInfo
      }
    }

    default: {
      return state;
    }
  }

}
