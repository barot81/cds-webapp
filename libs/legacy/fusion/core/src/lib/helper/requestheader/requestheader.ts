import { HttpHeaders } from '@angular/common/http';
import { TokenModel } from '@zhealthcare/fusion/models';
import { OrgState } from '../../store/reducers/org.reducers';


export class RequestHeader {
  static setSecurityContextHeader<T>(
    body: T,
    headers: HttpHeaders,
    oucodesArray: string[]
  ) {
    if (
      !!body &&
      body['securityContext'] !== undefined &&
      body['securityContext'] !== null
    ) {
      setTargetOucode();
      setTargetUserId();
    } else if (oucodesArray.length === 1) {
      headers = headers.set('TargetOUcode', oucodesArray[0]);
    }
    return headers;

    function setTargetUserId() {
      if (
        body['securityContext']['owningUser'] !== undefined &&
        body['securityContext']['owningUser'] !== null &&
        !headers.has('TargetUserId')
      )
        headers = headers.set(
          'TargetUserId',
          body['securityContext']['owningUser']
        );
    }

    function setTargetOucode() {
      if (
        body['securityContext']['owningOrganizationUnit'] !== undefined &&
        body['securityContext']['owningOrganizationUnit'] !== null &&
        !headers.has('TargetOUcode')
      )
        headers = headers.set(
          'TargetOUcode',
          body['securityContext']['owningOrganizationUnit']
        );
    }
  }

  static setFacilityAndStatusHeader(headers: HttpHeaders, orgState: OrgState,  oucodesArray: string[]) {
    if (!headers.has('FacilityId')) {
      headers = headers.set('FacilityId', orgState?.FacilityWiseStatuses?.FacilityId ? orgState.FacilityWiseStatuses.FacilityId : 'Base' );
    }
    if (!headers.has('Status') && oucodesArray) {
      oucodesArray.forEach(x => {
        headers = headers.append('Status', x);
      });
    }
    return headers;
  }

  static setDefaultHeaders(headers: HttpHeaders) {
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  static setTokenHeader(tokenModel: TokenModel, headers: HttpHeaders) {
    const token = tokenModel?.accessToken;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

}
