export interface IResponse {
  code: number;
  message: string;
  data: any;
}

export interface IResponseHelper {
  isSuccess(): boolean;
  getMessage(): string;
  getData(): any;
  setData(data: any): void;
  getResponse(): any;
}
