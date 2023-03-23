import { TokenSessionInfo } from '@exxat/fusion/models';

export class AppStateHelper {

    static getStateFromStorage(stateKey, isDelegateUser, preferSessionStorage) {
        let stateFromStorage;
        if (isDelegateUser)
            stateFromStorage = sessionStorage.getItem(stateKey)

        else if (preferSessionStorage) {
            if (sessionStorage.getItem(stateKey))
                stateFromStorage = sessionStorage.getItem(stateKey);
            else
                stateFromStorage = localStorage.getItem(stateKey);
        }
        else
            stateFromStorage = localStorage.getItem(stateKey);

        if (stateFromStorage === 'null' || stateFromStorage === 'undefined') {
            return {};
        } else {
            return JSON.parse(stateFromStorage);
        }
    }

    static generateTokenSessionInfo(userData): TokenSessionInfo {
        const token = userData.Token;
        let tokenSessionInfo = new TokenSessionInfo(0, 0);
        if (token !== undefined) {
            tokenSessionInfo = new TokenSessionInfo(
                this.getCurrentTimeStamp,
                this.getTokenExpTime(parseInt(token.expiration)),
                userData.LastName + ' ' + userData.FirstName
            )
        }
        return tokenSessionInfo;
    }

    static getTokenExpTime(expirationDuration) {
        const dt = new Date();
        dt.setMinutes(dt.getMinutes() + expirationDuration);
        return dt.getTime();
    }

    static readonly getCurrentTimeStamp = new Date().getTime();

}