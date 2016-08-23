/* eslint-disable no-param-reassign */
const NOTFOUND_STATUS = 404;
const NOTFOUND_BODY = {
  statusCode: NOTFOUND_STATUS,
  error: 'Not Found',
  message: 'missing',
};
const BAD_IMPLEMENTATION_STATUS = 500;
const BAD_IMPLEMENTATION_BODY = {
  statusCode: BAD_IMPLEMENTATION_STATUS,
  error: 'Internal Server Error',
  message: 'An internal server error occurred',
};

const handleError = onError => {
  if (typeof onError !== 'function') {
    throw new TypeError('onError must be a function');
  }

  return (context, next) => next()
    .then(() => {
      if (context.body === undefined) {
        context.status = NOTFOUND_STATUS;
        context.body = NOTFOUND_BODY;
      }
    })
    .catch(err => {
      onError(err);

      context.status = BAD_IMPLEMENTATION_STATUS;
      context.body = BAD_IMPLEMENTATION_BODY;
    });
};

module.exports = handleError;
module.exports.default = handleError;
module.exports.NOTFOUND_STATUS = NOTFOUND_STATUS;
module.exports.NOTFOUND_BODY = NOTFOUND_BODY;
module.exports.BAD_IMPLEMENTATION_STATUS = BAD_IMPLEMENTATION_STATUS;
module.exports.BAD_IMPLEMENTATION_BODY = BAD_IMPLEMENTATION_BODY;
