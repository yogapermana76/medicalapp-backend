import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from './response.interface';

@Injectable()
export class ResponseService {
  error(error: any) {
    if (error.driverError && error.code === '23502') {
      throw new BadRequestException('Missing required field');
    }

    if (error.driverError) {
      throw new BadRequestException(error.driverError.detail);
    }

    throw error;
  }

  success(
    message: string,
    data?: Record<string, any> | Record<string, any>[],
  ): IResponse {
    if (data) {
      return {
        message: message,
        data: data,
      };
    }

    return {
      message: message,
    };
  }
}
