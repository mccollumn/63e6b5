export interface DataSource {
  name: string;
  properties: DataSourceProperties[];
}

interface DataSourceProperties {
  name: string;
  type: string;
}
