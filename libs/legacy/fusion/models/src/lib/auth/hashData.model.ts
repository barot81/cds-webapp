export class HashDataModel {
  constructor(
    public hashCode: string,
    public data: JSON,
    public isModified: boolean
  ) { }
}