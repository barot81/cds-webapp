export class MethodType {
    public static readonly GET = 'GET';
    public static readonly POST = 'POST';
    public static readonly PUT = 'PUT';
    public static readonly DELETE = 'DELETE';
  }

  export class HttpConstants {
    public static readonly BASE = 'Base';
    public static readonly BASE_OUCODE = '1000';
  }

  export class MetaConstants {
    public static readonly VIEW_AS_STUDENT_ROLE_CODE = 'ViewAsStudent';
    public static readonly MANAGE_ACCOUNT_SWITCH_BACK_KEY =
      'manage_account_switching_back';
    public static readonly USER_LOCAL_STORAGE_KEY = 'User';
    public static readonly META_ROLE_LOCAL_STORAGE_KEY = 'Meta.Role';
    public static readonly USER_CONSENT_LOCAL_STORAGE_KEY =
      'user.consent.consentedAt';
    public static readonly IsDelegateUser = 'IsDelegateUser';
    public static readonly FACILITYID = 'FacilityId';
    public static readonly OUCODES = 'Oucodes';
    public static readonly SelectedStatus = 'SelectedStatus';
    public static readonly SelectedFacilityName = 'facilityName';
  }

  export class TokenConstants {
    public static readonly HAS_TOKEN_REQUIRED = 'HasTokenRenewRequired';
    public static readonly TOKEN_SESSION_INFO = 'tokenSessionInfo';
    public static readonly IS_AUTO_RENEW_INITIATED_IN_OTHER_TAB =
      'isAutoRenewInitiated';
    public static readonly SESSION_DIALOG_CLICK_EVENT = 'sessionDialogClickEvent';
  }
  export class URLConstants {
    public static readonly LOGIN_URL = '/account/login';
    public static readonly LAUNCH_URL = '/account/launch';
    public static readonly STUDENT_LAUNCH_URL = '/student/account/launch';
    public static readonly ADMIN_LAUNCH_URL = '/admin/account/launch';
    public static readonly FACULTY_LAUNCH_URL = '/faculty/account/launch';
    public static readonly DELEGATOR_LAUNCH_URL = '/delegator/account/launch';
    public static readonly DASHBOARD_URL = '/dashboard';
    public static readonly UserConsent_URL = '/UserConsent';
    public static readonly Change_Password_URL = '/account/changePassword';
    public static readonly MANAGE_ACCOUNT_URL = '/account/manageAccount';
    public static readonly MANAGE_ACCOUNT_SWITCH_BACK_URL =
      'MANAGE_ACCOUNT_SWITCH_BACK_URL';
    public static readonly DELEGATE_PATH = '/gateway/delegator';
    public static readonly DELEGATE_REFRESH_URL = '/delegator/session-timeout';
  }
