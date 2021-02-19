/* eslint-disable import/newline-after-import */
// initialize tracer
const rest = require('rest');
const express = require('express');
const { Tracer } = require('zipkin');
const { recorder } = require('./recorder');
const CLSContext = require('zipkin-context-cls');

const ctxImpl = new CLSContext('zipkin');
const tracer = new Tracer({ ctxImpl, recorder });

const app = express();

// instrument the server
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
app.use(zipkinMiddleware({
  tracer,
  serviceName: 'frontend' // name of this application
}));

const request = require('request')
const wrapRequest = require('zipkin-instrumentation-request');
const zipkinRequest = wrapRequest(request, { tracer, serviceName: 'request-zk' });

app.get('/', (req, res) => {
  setTimeout(() => {
    zipkinRequest('http://localhost:9000/api', function (err, response, body) {
      res.send(body)
    })
  }, 100);

});

app.listen(8081, () => {
  console.log('Frontend listening on port 8081!');
});
