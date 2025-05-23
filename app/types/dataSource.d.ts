export interface DataSource {
  id: string;
  name: string;
  properties: DataSourceProperties[];
}

export interface DataSourceProperties {
  name: string;
  type: string;
}

export interface GlobalPrefillMapping extends DataSource {
  properties: PrefillMapping[];
}
export interface PrefillMapping extends DataSourceProperties {
  value?: string | null;
}
