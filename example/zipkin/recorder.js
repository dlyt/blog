/* eslint-env browser */
const { BatchRecorder } = require('zipkin');
const { HttpLogger } = require('zipkin-transport-http');

// Send spans to Zipkin asynchronously over HTTP
const zipkinBaseUrl = 'http://127.0.0.1:9411';
const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: `${zipkinBaseUrl}/api/v1/spans`
  })
});

module.exports.recorder = recorder;
