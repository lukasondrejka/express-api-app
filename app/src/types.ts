import { Application as ExpressApplication, NextFunction as ExpressNextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './models/user.model';

export type Application = ExpressApplication;

export interface Message {
  status: Status;
  message?: string;
  [key: string]: any;
}

export interface Error extends Message {
  name: string;
  [key: string]: any;
}

export interface Request extends ExpressRequest {
  user?: User | null;
}

export type Response = ExpressResponse;

export type NextFunction = ExpressNextFunction;

export import Status = StatusCodes;
