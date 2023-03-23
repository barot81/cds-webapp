import { loadRemoteModule, setRemoteDefinitions } from '@nrwl/angular/mf';
import lodash from 'lodash';

import { microfrontends } from '../configuration/fusion-config.service';
import { MicroFrontEnds } from '../configuration/types/app-settings';

export function loadRemoteModuleFromDefinitions(
  remoteAppName: string,
  exposedModule: string,
  remoteModuleName: string
) {
  return Promise.resolve(
    // setRemoteDefinitions(lodash.pick(microfrontends, [remoteAppName]))
    setRemoteDefinitions(microfrontends)
  ).then(() =>
    loadRemoteModule(remoteAppName, exposedModule).then((m) => m[remoteModuleName])
  );
}

export function setRemoteModuleDefinitions(remotes?: MicroFrontEnds) {
  return Promise.resolve(setRemoteDefinitions(remotes ? remotes : microfrontends));
}
