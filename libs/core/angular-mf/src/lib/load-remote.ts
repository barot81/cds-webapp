import { loadRemoteModule, setRemoteDefinitions } from '@nrwl/angular/mf';
import { Routes } from '@angular/router';

import { MicroFrontEnds } from './micro-frontends';

export let MF_CONFIG: MicroFrontEnds;
export let BOOTSTRAP_DEFINITIONS: Routes = [];

export async function loadRemoteModuleFromDefinitions(
  remoteAppName: string,
  exposedModule: string,
  remoteModuleName: string
) {
  await Promise.resolve(setRemoteDefinitions(MF_CONFIG));
  const m = await loadRemoteModule(remoteAppName, exposedModule);
  return m[remoteModuleName];
}

export function setRemoteModuleDefinitions(remotes?: MicroFrontEnds) {
  return Promise.resolve(setRemoteDefinitions(remotes ? remotes : MF_CONFIG));
}

export function setMFConfig(remotes: MicroFrontEnds) {
  MF_CONFIG = remotes;
}

export function setBootstrapDefinitions(bootstrapDefinitions: Routes) {
  BOOTSTRAP_DEFINITIONS = bootstrapDefinitions;
}
