worker模块提供了一种方法来创建运行在独立线程上的多个环境，并在它们之间创建消息通道。它可以这样使用:
```js
const worker = require('worker_threads');
```
Workers 对于执行 cpu 密集型的 JavaScript 操作非常有用; 但是不要将它们用于 I/O 操作, 因为 Node.js 的内置机制已经比 Worker threads 更有效地处理它。 
例:
```js
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  module.exports = async function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}
```