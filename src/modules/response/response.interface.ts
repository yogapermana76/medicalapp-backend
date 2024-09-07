export interface IErrors {
  readonly message: string;
  readonly property: string;
}

export interface IResponse {
  readonly message: string;
  readonly errors?: IErrors[];
  readonly data?: Record<string, any> | Record<string, any>[];
}
