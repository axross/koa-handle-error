import * as Koa from 'koa';

type OnError = (err: Error) => void;
type HandleError = (onError: OnError) =>
  (context: Koa.Context, next: () => Promise<any>) => void;

declare const handleError: HandleError;

export default handleError;
