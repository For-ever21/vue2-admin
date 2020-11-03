import { IResponseHelper, IResponse } from "@/dataTypes/interface/responseHelper";
import { isString } from "@utils/commonUtil";
const debug = process.env.NODE_ENV === "development";

export default class ResponseHelper implements IResponseHelper {
  private response: IResponse;

  public constructor(response: IResponse) {
    const data = response.data;
    if (isString(data) && data) {
      try {
        response.data = JSON.parse(data);
      } catch (error) {
        console.error(error);
        response.data = data;
      }
    }
    this.response = response;

    if (debug) {
      console.debug(this.response);
    }
  }

  public isSuccess(): boolean {
    return this.response.code === 0;
  }

  public getMessage(): string {
    return this.response.message || "请求出错";
  }

  public setMessage(message: string): void {
    this.response.message = message;
  }

  public getData(): any {
    return this.response.data;
  }

  public setData(data: any): any {
    this.response.data = data;
  }

  public getResponse(): IResponse {
    return this.response;
  }
}
