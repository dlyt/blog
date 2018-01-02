// const DBPool = require('dxl-mysql');
// const nodeServerConf = require('../nodeServer');
// const testDb = DBPool.createPool(nodeServerConf.mysql.test);

// for (let i = 0; i <= 100000; i++) {
//     testDb.query(`insert into url (url,link_id)  values ('http://git.dxl.cc/node/node_modules/tags/1.170927${i}', ${i})`).then(d => {
//         console.log(i)
//     })
// }
// console.time('test')
// testDb.query(`select * from url u left join link l on u.link_id = l.id where u.url = 'http://git.dxl.cc/node/node_modules/tags/1.17092710'`).then(d => {
//     console.timeEnd('test')
//     console.log(d)
// })

var mongoose = require('mongoose') 
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
mongoose.Promise = global.Promise;
var link = new Schema({
    name: String,
    url: String
})

var url = new Schema({
    link: {type: ObjectId, ref: 'Link'},
    url: String
})

var Url = mongoose.model('Url', url);
var Link = mongoose.model('Link', link);
mongoose.connect('mongodb://192.168.22.230/daoxila')

var i = 0

// function start() {
//     var link = new Link({
//         name: `asdfsa${i}`,
//         url: `https://iq.dxlfile.com/mall/original/2017-07/20170712151773465.jpg-w216h162${i}`
//     })
//     if (i < 100000) {
//         link.save(function (err, d) {
            
//             const url = new Url({
//                 link: d._id,
//                 url: `https://iq.dxlfile.com/mall/original/2017-07/20170712151773465.j62${i}`
//             })
        
//             url.save(function (err, data) {
//                 console.log(i)
//                 i++
//                 start()
//             })
//         })
        
//     }
// }
// start()
// console.time('test')
// Url.findOne({url: 'https://iq.dxlfile.com/mall/original/2017-07/20170712151773465.j62999'})
//   .populate('link').exec(function (err, d) {
//       console.timeEnd('test')
//       console.log(d)
// })


