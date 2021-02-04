import Hapi, { ResponseToolkit, Lifecycle } from '@hapi/hapi';

type CustomMethod<Params, Payload, UserCredentials, Query> = (
  request: CustomRequest<Params, Payload, UserCredentials, Query>,
  h: ResponseToolkit,
  err?: Error,
) => Lifecycle.ReturnValue;

type CustomAuthCredentials<
  T extends Hapi.UserCredentials
> = Hapi.AuthCredentials & { user?: T };

type CustomRequestAuth<T> = Hapi.RequestAuth & {
  credentials: CustomAuthCredentials<T>;
};

type CustomRequest<Params, Payload, UserCredentials, Query> = Hapi.Request & {
  auth: CustomRequestAuth<UserCredentials>;
  params: Params;
  payload: Payload;
  query: Query;
};

export type RouteModule<
  Params = unknown,
  Payload = unknown,
  UserCredentials = unknown,
  Query = unknown
> = Omit<Hapi.ServerRoute, 'method' | 'path' | 'handler'> & {
  handler: CustomMethod<Params, Payload, UserCredentials, Query>;
};

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
