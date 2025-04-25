import { Request, Response } from 'express';

/**
 * Типизированный Request с телом запроса
 */
export type TypedRequestBody<T> = Request<{}, {}, T>;

/**
 * Типизированный Request с параметрами пути
 */
export type TypedRequestParams<T> = Request<T, {}, {}>;

/**
 * Типизированный Request с query-параметрами
 */
export type TypedRequestQuery<T> = Request<{}, {}, {}, T>;

/**
 * Типизированный Response
 */
export type TypedResponse<T> = Response<T>;