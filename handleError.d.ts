declare module 'koa-handle-error' {
  import * as Koa from 'koa';

  type OnError = (err: Error) => void;
  type HandleError = (onError: OnError) =>
    (context: Koa.Context, next: () => Promise<any>) => void;

  const handleError: HandleError;

  export default handleError;
  export = handleError;
}