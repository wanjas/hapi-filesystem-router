import Hapi, { ResponseToolkit, Lifecycle } from '@hapi/hapi';
import { Merge } from 'type-fest';

type CustomMethod<Params, Payload, UserCredentials, Query> = (
  request: CustomRequest<Params, Payload, UserCredentials, Query>,
  h: ResponseToolkit,
  err?: Error,
) => Lifecycle.ReturnValue;

type CustomAuthCredentials<T extends Hapi.UserCredentials> = Merge<
  Hapi.AuthCredentials,
  { user?: T }
>;

type CustomRequestAuth<T> = Merge<
  Hapi.RequestAuth,
  {
    credentials: CustomAuthCredentials<T>;
  }
>;

type CustomRequest<Params, Payload, UserCredentials, Query> = Merge<
  Hapi.Request,
  {
    auth: CustomRequestAuth<UserCredentials>;
    params: Params;
    payload: Payload;
    query: Query;
  }
>;

export type RouteModule<
  Params = unknown,
  Payload = unknown,
  UserCredentials = unknown,
  Query = unknown,
> = Omit<
  Merge<
    Hapi.ServerRoute,
    {
      handler?: CustomMethod<Params, Payload, UserCredentials, Query>;
    }
  >,
  'method' | 'path'
>;

type RequestArgs = {
  params?: unknown;
  payload?: unknown;
  user?: unknown;
  query?: unknown;
};

/* FileSystem route module */
export type FSRM<T extends RequestArgs = Required<RequestArgs>> = RouteModule<
  T['params'],
  T['payload'],
  T['user'],
  T['query']
>;
