# koa-handle-error

[![npm version](https://badge.fury.io/js/koa-handle-error.svg)](https://badge.fury.io/js/koa-handle-error)
[![CircleCI](https://circleci.com/gh/axross/koa-handle-error/tree/master.svg?style=svg&circle-token=85b535fa3bfdc52bf0059ba0110faec119624a39)](https://circleci.com/gh/axross/koa-handle-error/tree/master)

Error handler Middleware for [Koa@2.x](https://github.com/koajs/koa/tree/v2.x)

## Installation

```
npm install koa-handle-error
```

## Usage

**IMPORTANT: `handleError` must register first as Koa middleware!**

```js
const Koa = require('koa');
const handleError = require('koa-handle-error');
const app = new Koa();

const onError = err => {
  console.error(err);
};

app.use(handleError(onError));  // must register first!
app.use(someMiddleware());
app.use(otherMiddleware());
```

### API

#### handleError(onError: Function): (context: Koa.Context, next: () => Promise<any>) => void

Returns a Koa middleware.

`onError` will called with the error when some error occured.

### License

[MIT](https://axross.mit-license.org/)
