/**
 * Response helper
 */

import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Error, Response, Status } from '../types';

export function handleResponse(res: Response, code: Status, data?: any) {
  return res.status(<StatusCodes>(<unknown>code)).json(data);
}

export function handleError(res: Response, code: Status, message: string, data?: any) {
  const error: Error = {
    status: code,
    name: getReasonPhrase(<StatusCodes>(<unknown>code)),
    message: message,
    ...data,
  };

  return res.status(<StatusCodes>(<unknown>code)).json(error);
}

export function handleCatch(res: Response, e: any, code: Status = Status.INTERNAL_SERVER_ERROR) {
  console.log(e);
  return handleError(res, code, e.message, { error: e });
}
