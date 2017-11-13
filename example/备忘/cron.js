const co = require('co');
const CronJob = require('cron').CronJob;
const { exec } = require('child_process');

// 每15分钟执行一次
const orderJob = new CronJob('* 15 * * * *', () => {
    co(function*() {
        orderJob.stop();
        yield _exec('node controllers/eventCollect/taskOrder > ../logs/taskOrder_access.log 2> ../logs/taskOrder_error.log');
        orderJob.start();
        console.log('end')
    }).catch(err => {
        console.log(err)
    })
});

orderJob.start();

// 每天0点执行一次
const orderJobA = new CronJob('* * 0 * * *', () => {
    co(function*() {
        orderJobA.stop();
        yield _exec('node controllers/eventCollect/taskOrderA > ../logs/taskOrderA_access.log 2> ../logs/taskOrderA_error.log');
        orderJobA.start();
    }).catch(err => {
        console.log(err);
    })
})

orderJobA.start();

// 每天6点执行一次
const businessJob = new CronJob('* * 6 * * *', () => {
    co(function*() {
        businessJob.stop();
        // 婚宴业务
        yield _exec('node controllers/hunyan/hotelAll > ../logs/hotelAll_access.log 2> ../logs/hotelAll_error.log');
        yield _exec('node controllers/hunyan/deleteAll > ../logs/hunyan_deleteAll_access.log 2> ../logs/hunyan_hotelAll_error.log');
        yield _exec('node controllers/hunyan/searchAll > ../logs/hunyan_searchAll_access.log 2> ../logs/hunyan_searchAll_error.log');
    }).catch(err => {
        
    })
})

const _exec = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, function (err, stdout, stderr) {
            console.log(stderr)
            console.log(stdout)
            if (err) {
                reject(err)
            }
            return resolve();
        })
    })
}

const _spawn = (filePath) => {
    return new Promise((resolve, reject) => {
        free = spawn('node', [filePath], { encoding: 'utf-8' });
        free.stdout.on('data', function(chunk) {
            console.log(chunk.toString());
        });
        free.stderr.on('data', (data) => {
            console.log(data);
        });
        // 注册子进程关闭事件 
        free.on('exit', function (code, signal) { 
            resolve();
        });
    })
}