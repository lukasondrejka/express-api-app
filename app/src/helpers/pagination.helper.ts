/**
 * Pagination helper
 */

import { ModelCtor } from 'sequelize-typescript';
import { Request } from '../types';

const paginationDefaultLimit = 10;
const paginationMaxLimit = 100;

interface PaginationHelper<M extends ModelCtor> {
  count: number;
  limit: number;
  page: number;
  data: M[];
}

async function pagination<M extends ModelCtor>(model: M, req: Request, options: object = {}, scope: string | string[] = []): Promise<any> {
  const limit = parseInt(<string>req.query.limit) || paginationDefaultLimit;
  const page = Math.min(parseInt(<string>req.query.page) || 1, paginationMaxLimit);

  options = {
    ...options,
    limit,
    offset: (page - 1) * limit,
  };

  let rows: any;
  let count: number;

  if (scope) {
    rows = await model.scope(scope).findAll(options);
    count = (await model.scope(scope).findAll({ ...options, limit: undefined, offset: undefined })).length;
  } else {
    rows = await model.findAll(options);
    count = (await model.findAll({ ...options, limit: undefined, offset: undefined })).length;
  }

  return <PaginationHelper<M>>{
    count,
    limit,
    page,
    data: <M[]>(<unknown>rows),
  };
}

export default pagination;
