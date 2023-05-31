import { FacilityWiseStatuses } from './facilityWiseStatusCount';
export class LaunchDataModel {
  constructor(
    public tenentWithOucodeAccessTrees: FacilityWiseStatuses[],
    public roleHash: string,
    public navigationHash: string
  ) {}
}
