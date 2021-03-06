/* eslint-disable import/newline-after-import */
// initialize tracer
const express = require('express');
const CLSContext = require('zipkin-context-cls');
const { Tracer } = require('zipkin');
const { recorder } = require('./recorder');
const rest = require('rest');
const ctxImpl = new CLSContext('zipkin');
const tracer = new Tracer({ ctxImpl, recorder });
const app = express();
// instrument the server
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
app.use(zipkinMiddleware({
  tracer,
  serviceName: 'backend' // name of this application
}));

app.get('/api', (req, res) => {
  setTimeout(() => {
    res.send(new Date().toString())
  }, 100);
  // res.send(new Date().toString())
});

app.listen(9000, () => {
  console.log('Backend listening on port 9000!');
});
