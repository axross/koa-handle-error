# koa-handle-error

Error handler Middleware for Koa@2.x

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

#### handleError(onError: Function): void

Returns a Koa middleware.

`onError` will called with the error when some error occured.

### License

[MIT](https://axross.mit-license.org/)
