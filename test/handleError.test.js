/* eslint-disable import/no-extraneous-dependencies */
const test = require('ava');
const Boom = require('boom');
const handleError = require('../handleError');

const MOCK_ONERROR = () => {};
const MOCK_NEXT = () => Promise.resolve();

test('handleError(onError) throws an Error if onError is not a Function.', t => {
  t.throws(() => handleError(''));
  t.throws(() => handleError(1));
  t.throws(() => handleError(true));
  t.throws(() => handleError(null));
  t.throws(() => handleError(undefined));
  t.throws(() => handleError({}));
  t.throws(() => handleError([]));
  t.notThrows(() => handleError(MOCK_ONERROR));
  t.notThrows(() => handleError(() => {}));
});

test('handleError() writes an Error to context when context.body is the undefined.', t => {
  const mockContext = {};
  const middleware = handleError(MOCK_ONERROR);

  return middleware(mockContext, MOCK_NEXT)
    .then(() => {
      t.deepEqual(mockContext, {
        status: Boom.notFound().output.statusCode,
        body: Boom.notFound('missing').output.payload,
      });
    });
});

test('handleError() writes an Error to context when the promise has rejected.', t => {
  const mockContext = {};
  const middleware = handleError(MOCK_ONERROR);
  const error = new Error();

  return middleware(mockContext, () => Promise.reject(error))
    .then(() => {
      t.deepEqual(mockContext, {
        status: Boom.badImplementation().output.statusCode,
        body: Boom.badImplementation().output.payload,
      });
    });
});

test.cb('handleError(onError) calls onError with the Error when the promise has rejected.', t => {
  const mockContext = {};
  const error = new Error();
  const middleware = handleError(err => {
    t.is(err, error);
    t.end();
  });

  middleware(mockContext, () => Promise.reject(error));
});
