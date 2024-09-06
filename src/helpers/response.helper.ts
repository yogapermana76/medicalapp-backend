export class SuccessResponse<T> {
  code: number;
  message: string;
  data: T;

  constructor(data: T, message: string = 'Success', code: number = 200) {
    this.data = data;
    this.message = message;
    this.code = code;
  }
}
